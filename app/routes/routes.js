"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const land_route_1 = require("../modules/land/land.route");
const blog_route_1 = require("../modules/blog/blog.route");
const meta_route_1 = require("../modules/metaData/meta.route");
const gallery_route_1 = require("../modules/gallery/gallery.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        route: user_route_1.UserRouter,
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRouter,
    },
    {
        path: "/land",
        route: land_route_1.LandRoute,
    },
    {
        path: "/blog",
        route: blog_route_1.BlogRoute,
    },
    {
        path: "/meta-data",
        route: meta_route_1.MetaDataRoute,
    },
    {
        path: "/gallery",
        route: gallery_route_1.GalleryRouter,
    },
];
moduleRoutes.forEach((item) => router.use(item === null || item === void 0 ? void 0 : item.path, item === null || item === void 0 ? void 0 : item.route));
exports.default = router;
