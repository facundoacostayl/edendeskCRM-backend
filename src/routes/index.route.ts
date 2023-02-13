import fs from "fs";
import Router from "express";

const router = Router();

const currentPath: string = `${__dirname}`;

const removeExtension = (file: string) => {
  const cleanFile = file.split(".").shift();
  return cleanFile;
};

fs.readdirSync(currentPath).filter((file) => {
  const cleanFile = removeExtension(file);
  if (cleanFile !== "index") {
    import(`./${cleanFile}.route`).then((route) => {
      router.use(`/${cleanFile}`, route.router);
    });
  }
});

export { router };
