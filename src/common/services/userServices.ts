// import jwtConfig from "@config/jwt.config";
// import { Inject, Injectable } from "@nestjs/common";
// import { ConfigType } from "@nestjs/config";
// import { InjectModel } from "@nestjs/sequelize";
// import { Permission } from "src/modules/permissions/entities/permission.entity";
// import { Role } from "src/modules/roles/entities/role.entity";
// import { User } from "src/modules/user/entities/user.entity";

// @Injectable()
// export class UserServices {
//   constructor(
//     @Inject(jwtConfig.KEY)
//     private readonly jwtConfigration: ConfigType <typeof jwtConfig>,
//     @InjectModel(User)
//     private readonly userModel: typeof User,
//     @InjectModel(Role)
//     private readonly roleModel: typeof Role,
//     @InjectModel(Permission)
//     private readonly permissionModel: typeof Permission
//   ){}

//   async getUserByEmail(user: any) {
//     try {
//       const response = await this.userModel.findOne({
//         where: { email: user.email },
//         include: [
//           { model: this.roleModel },
//           { model: this.permissionModel }
//         ]
//       });
//       return response
//     } catch (err) {
//       throw err
//     }
//   }
// }
