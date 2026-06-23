import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import User from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../helper/token.js"

export const generateTokens = async (userId) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new ApiError(404, "User not found.");
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        const sanitizedUser = user.toObject();
        delete sanitizedUser.password;
        delete sanitizedUser.refreshToken;

        return { accessToken, refreshToken, user: sanitizedUser };

    } catch (error) {
        throw new ApiError(
            error.statusCode || 500,
            error.message || "Something went wrong while generating tokens"
        );
    }
};


export const sendTokens = async (userId, res, message = "Success", statusCode = 200) => {
    const { accessToken, refreshToken, user } = await generateTokens(userId);

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        path: "/",
    }

    return res
        .status(statusCode)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(statusCode, { user, accessToken, refreshToken }, message))

}

export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const existUser = await User.findOne({ email });

    if (existUser) {
        throw new ApiError(400, "User already exists.");
    }

    const user = await User.create({
        name,
        email,
        password
    });

    return sendTokens(user._id, res, "User registered Successfully.");
});

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User does not exist.");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Incorrect Credentials.");
    }

    return sendTokens(user._id, res, "User logged in successfully", 200);
});

export const logoutUser = asyncHandler(async (req, res) => {
    if (!req.user || !req.user._id) {
        throw new ApiError(401, "Unauthorized request");
    }
    await User.findByIdAndUpdate(req.user._id, {
        $unset: { refreshToken: "" },
    })

    const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        path: "/"
    }

    res
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .status(200)
        .json(new ApiResponse(200, {}, "User logged out successfully."))


})

export const rotateToken = asyncHandler(async (req, res) => {

    const incomingRefreshToken = req.cookies?.refreshToken || req.header("Authorization")?.replace("Bearer ","")

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorization Request. Refresh Token missing");
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ApiError(401, "Invalid refresh Token");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh Token is expired or used.");
        }
        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            path: "/"
        }

       const { accessToken, refreshToken } = await generateTokens(user._id);


        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken },
                    "Token Rotated successfully."
                )
            )


    } catch (error) {
        throw new ApiError(401, error.message)
    }
})