import routes from "./routes";

export const localsmiddleware = (req, res, next) => {
    res.locals.routes = routes;

    next();
};