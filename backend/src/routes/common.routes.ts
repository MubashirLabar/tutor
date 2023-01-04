import { Router, Request, Response } from 'express';

export class CommonRoutes {
  public readonly router: Router;
  constructor() {
    this.router = Router();
    this.createRoutes();
  }
  public createRoutes() {
    // Mismatch URL
    this.router.all('*', function (req: Request, res: Response) {
      res.status(404).send({ error: true, message: 'Check your URL please' });
    });
  }
}

export default new CommonRoutes();
