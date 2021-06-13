import {User} from "../models/users.model";
import UserService from '../services/users.service';

class UserController {

  async get(req, res, next) {
    const {body} = req;
    try {
      return res.send(await UserService.get())
    } catch (e) {
      return next(e);
    }
  }

  async create(req, res, next) {
    try {
      const {body} = req;
      print(req);
      return res.send(await UserService.create(body));
    } catch (e) {
      return next(e)
    }
  }

  async update(req, res, next) {
    try {
      const {body} = req;
      const {userId} = req.params;
      return res.send(await UserService.update(body, userId));
    } catch (e) {
      return next(e)
    }
  }

  async auth(req, res, next) {
    try {
      const {body} = req;
      return res.send(await UserService.auth(body));
    } catch (e) {
      return next(e);
    }
  }

}


export default new UserController();