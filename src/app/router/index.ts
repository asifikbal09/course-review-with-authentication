import { Router } from "express";
import { CourseRoutes } from "../modules/course/course.route";
import { CategoryRoutes } from "../modules/category/category.route";

const router = Router();

const moduleRoutes = [
 {
    path:'/course',
    route:CourseRoutes
 },
 {
    path:'/categories',
    route:CategoryRoutes
 },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;