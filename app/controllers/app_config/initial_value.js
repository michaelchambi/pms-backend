const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const data = require("../../models");

const app_role = data.pms_roles;
const app_profile = data.pms_profile;
const app_room = data.pms_rooms;
const app_user = data.users;
const app_user_profile = data.user_profiles;
const app_user_role = data.user_roles;
const app_module = data.pms_modules;
const app_submodule = data.pms_sub_modules;
const app_setting = data.pms_app;
const app_action = data.pms_sub_module_action;
const app_module_permissions = data.pms_module_permission;
const app_sub_module_permissions = data.pms_sub_module_permission;
const app_sub_action = data.pms_action_permission;


module.exports = {

     initial_values(){

        app_module.create({
            name:"Configurations",
            icon:"fal fa-cogs",
            linkName:"Configurations",
            status:1,
        })
        .then(()=>{
            app_module_permissions.create({
                permission: "true",
                moduleId:1,
                roleId:1
            });
        });
    
        app_submodule.create({
            name:"Modules",
            link:"modules",
            icon:"fad fa-th",
            linkName:"Modules",
            status:1,
            moduleId:1,
        })
        .then(()=>{
            app_sub_module_permissions.create({
                permission: "true",
                sub_moduleId:1,
                moduleId:1,
                roleId:1
            });
        })
        .then(()=>{
            app_action.create({
                name:"add module",
                status:1,
                moduleId:1,
                sub_moduleId:1
            });
        
            app_action.create({
                name:"edit module",
                status:1,
                moduleId:1,
                sub_moduleId:1
            });
        
            app_action.create({
                name:"activate module",
                status:1,
                moduleId:1,
                sub_moduleId:1
            });
        
            app_action.create({
                name:"deactivate module",
                status:1,
                moduleId:1,
                sub_moduleId:1
            });
        
            app_action.create({
                name:"add sub-module",
                status:1,
                moduleId:1,
                sub_moduleId:1
            });
        
            app_action.create({
                name:"edit sub-module",
                status:1,
                moduleId:1,
                sub_moduleId:1
            });
        
            app_action.create({
                name:"activate sub-module",
                status:1,
                moduleId:1,
                sub_moduleId:1
            });
        
            app_action.create({
                name:"deactivate sub-module",
                status:1,
                moduleId:1,
                sub_moduleId:1
            });
        
        
            app_action.create({
                name:"add sub-module-action",
                status:1,
                moduleId:1,
                sub_moduleId:1
            });
        
            app_action.create({
                name:"edit sub-module-action",
                status:1,
                moduleId:1,
                sub_moduleId:1
            });
        
            app_action.create({
                name:"activate sub-module-action",
                status:1,
                moduleId:1,
                sub_moduleId:1
            });
        
            app_action.create({
                name:"deactivate sub-module-action",
                status:1,
                moduleId:1,
                sub_moduleId:1
            });
        })
        .then(()=>{
            app_sub_action.create({
                permission: "true",
                actionId:1,
                sub_moduleId:1,
                moduleId:1,
                roleId:1 
            });
        
            app_sub_action.create({
                permission: "true",
                actionId:2,
                sub_moduleId:1,
                moduleId:1,
                roleId:1 
            });
        
            app_sub_action.create({
                permission: "true",
                actionId:3,
                sub_moduleId:1,
                moduleId:1,
                roleId:1 
            });
        
            app_sub_action.create({
                permission: "true",
                actionId:4,
                sub_moduleId:1,
                moduleId:1,
                roleId:1 
            });
        
            app_sub_action.create({
                permission: "true",
                actionId:5,
                sub_moduleId:1,
                moduleId:1,
                roleId:1 
            });
        
            app_sub_action.create({
                permission: "true",
                actionId:6,
                sub_moduleId:1,
                moduleId:1,
                roleId:1 
            });
        
            app_sub_action.create({
                permission: "true",
                actionId:7,
                sub_moduleId:1,
                moduleId:1,
                roleId:1 
            });
        
            app_sub_action.create({
                permission: "true",
                actionId:8,
                sub_moduleId:1,
                moduleId:1,
                roleId:1 
            });
        
            app_sub_action.create({
                permission: "true",
                actionId:9,
                sub_moduleId:1,
                moduleId:1,
                roleId:1 
            });
        
            app_sub_action.create({
                permission: "true",
                actionId:10,
                sub_moduleId:1,
                moduleId:1,
                roleId:1 
            });
        
            app_sub_action.create({
                permission: "true",
                actionId:11,
                sub_moduleId:1,
                moduleId:1,
                roleId:1 
            });
        
            app_sub_action.create({
                permission: "true",
                actionId:12,
                sub_moduleId:1,
                moduleId:1,
                roleId:1 
            });
        });
    
        app_submodule.create({
            name:"Roles",
            link:"roles",
            icon:"fal fa-user-tag",
            linkName:"Roles",
            status:1,
            moduleId:1,
        })
        .then(()=>{
            app_sub_module_permissions.create({
                permission: "true",
                sub_moduleId:2,
                moduleId:1,
                roleId:1
            });
        })
        .then(()=>{
            app_action.create({
                name:"add role",
                status:1,
                moduleId:1,
                sub_moduleId:2
            });
           
            app_action.create({
                name:"edit role",
                status:1,
                moduleId:1,
                sub_moduleId:2
            });
    
            app_action.create({
                name:"activate role",
                status:1,
                moduleId:1,
                sub_moduleId:2
            });
    
            app_action.create({
                name:"deactivate role",
                status:1,
                moduleId:1,
                sub_moduleId:2
            });
    
            app_action.create({
                name:"delete role",
                status:1,
                moduleId:1,
                sub_moduleId:2
            });
    
            app_action.create({
                name:"update permission",
                status:1,
                moduleId:1,
                sub_moduleId:2
            });
        })
        .then(()=>{
            app_sub_action.create({
                permission: "true",
                actionId:13,
                sub_moduleId:2,
                moduleId:1,
                roleId:1 
            });
        
            app_sub_action.create({
                permission: "true",
                actionId:14,
                sub_moduleId:2,
                moduleId:1,
                roleId:1 
            });
        
            app_sub_action.create({
                permission: "true",
                actionId:15,
                sub_moduleId:2,
                moduleId:1,
                roleId:1 
            });
        
            app_sub_action.create({
                permission: "true",
                actionId:16,
                sub_moduleId:2,
                moduleId:1,
                roleId:1 
            });
        
            app_sub_action.create({
                permission: "true",
                actionId:17,
                sub_moduleId:2,
                moduleId:1,
                roleId:1 
            });
        
            app_sub_action.create({
                permission: "true",
                actionId:18,
                sub_moduleId:2,
                moduleId:1,
                roleId:1 
            });
        });
    
        app_submodule.create({
            name:"Users",
            link:"view-users",
            icon:"fal fa-users",
            linkName:"Users",
            status:1,
            moduleId:1,
        })
        .then(()=>{
            app_sub_module_permissions.create({
                permission: "true",
                sub_moduleId:3,
                moduleId:1,
                roleId:1
            });
        })
        .then(()=>{
            app_action.create({
                name:"add user",
                status:1,
                moduleId:1,
                sub_moduleId:3
            });
    
            app_action.create({
                name:"edit user",
                status:1,
                moduleId:1,
                sub_moduleId:3
            });
    
            app_action.create({
                name:"activate user",
                status:1,
                moduleId:1,
                sub_moduleId:3
            });
    
            app_action.create({
                name:"deactivate user",
                status:1,
                moduleId:1,
                sub_moduleId:3
            });
           
            app_action.create({
                name:"delete user",
                status:1,
                moduleId:1,
                sub_moduleId:3
            });
         
            app_action.create({
                name:"reset password",
                status:1,
                moduleId:1,
                sub_moduleId:3
            });
        })
        .then(()=>{
            app_sub_action.create({
                permission: "true",
                actionId:19,
                sub_moduleId:3,
                moduleId:1,
                roleId:1 
            });
    
            app_sub_action.create({
                permission: "true",
                actionId:20,
                sub_moduleId:3,
                moduleId:1,
                roleId:1 
            });
    
            app_sub_action.create({
                permission: "true",
                actionId:21,
                sub_moduleId:3,
                moduleId:1,
                roleId:1 
            });
    
            app_sub_action.create({
                permission: "true",
                actionId:22,
                sub_moduleId:3,
                moduleId:1,
                roleId:1 
            });
    
            app_sub_action.create({
                permission: "true",
                actionId:23,
                sub_moduleId:3,
                moduleId:1,
                roleId:1 
            });
    
            app_sub_action.create({
                permission: "true",
                actionId:24,
                sub_moduleId:3,
                moduleId:1,
                roleId:1 
            });
        });
    
        app_submodule.create({
            name:"Profiles",
            link:"profile",
            icon:"fal fa-user-tag",
            linkName:"Profile",
            status:1,
            moduleId:1,
        })
        .then(()=>{
            app_sub_module_permissions.create({
                permission: "true",
                sub_moduleId:4,
                moduleId:1,
                roleId:1
            });
        })
        .then(()=>{
            app_action.create({
                name:"add profile",
                status:1,
                moduleId:1,
                sub_moduleId:4
            });
    
            app_action.create({
                name:"edit profile",
                status:1,
                moduleId:1,
                sub_moduleId:4
            });
    
            app_action.create({
                name:"activate profile",
                status:1,
                moduleId:1,
                sub_moduleId:4
            });
    
            app_action.create({
                name:"deactivate profile",
                status:1,
                moduleId:1,
                sub_moduleId:4
            });
           
            app_action.create({
                name:"delete profile",
                status:1,
                moduleId:1,
                sub_moduleId:4
            });
        })
        .then(()=>{
            app_sub_action.create({
                permission: "true",
                actionId:25,
                sub_moduleId:4,
                moduleId:1,
                roleId:1 
            });
    
            app_sub_action.create({
                permission: "true",
                actionId:26,
                sub_moduleId:4,
                moduleId:1,
                roleId:1 
            });
    
            app_sub_action.create({
                permission: "true",
                actionId:27,
                sub_moduleId:4,
                moduleId:1,
                roleId:1 
            });
    
            app_sub_action.create({
                permission: "true",
                actionId:28,
                sub_moduleId:4,
                moduleId:1,
                roleId:1 
            });
    
            app_sub_action.create({
                permission: "true",
                actionId:29,
                sub_moduleId:4,
                moduleId:1,
                roleId:1 
            });
    
        });
    
        app_submodule.create({
            name:"Settings",
            link:"app-config",
            icon:"fal fa-tools",
            linkName:"Settings",
            status:1,
            moduleId:1,
        })
        .then(()=>{
            app_sub_module_permissions.create({
                permission: "true",
                sub_moduleId:5,
                moduleId:1,
                roleId:1
            });
        })
        .then(()=>{
            app_action.create({
                name:"add configuration",
                status:1,
                moduleId:1,
                sub_moduleId:5
            });
    
            app_action.create({
                name:"edit configuration",
                status:1,
                moduleId:1,
                sub_moduleId:5
            });
    
            app_action.create({
                name:"Activate configuration",
                status:1,
                moduleId:1,
                sub_moduleId:5
            });
    
            app_action.create({
                name:"Deactivatedit configuration",
                status:1,
                moduleId:1,
                sub_moduleId:5
            });
        })
        .then(()=>{
            app_sub_action.create({
                permission: "true",
                actionId:30,
                sub_moduleId:5,
                moduleId:1,
                roleId:1 
            });
    
            app_sub_action.create({
                permission: "true",
                actionId:31,
                sub_moduleId:5,
                moduleId:1,
                roleId:1 
            });
    
            app_sub_action.create({
                permission: "true",
                actionId:32,
                sub_moduleId:5,
                moduleId:1,
                roleId:1 
            });
    
            app_sub_action.create({
                permission: "true",
                actionId:33,
                sub_moduleId:5,
                moduleId:1,
                roleId:1 
            });
        })
        
    
        
        app_module.create({
            name:"Tasks & Project",
            icon:"fal fa-share-alt",
            linkName:"project",
            status:1,
        })
        .then(()=>{
            app_module_permissions.create({
                permission: "true",
                moduleId:2,
                roleId:1
            });
        });





        app_role.create({ 
            name: "Super Admin Role",
            status: 1
        });
    
        app_profile.create({
            name:"System Admin",
            status: 1
        });
    
        app_room.create({
            name:"Ict Room",
            status: 1
        });
    
        app_user.create({
            firstname: "Super",
            lastname: "Admin",
            fullname:"Super Admin",
            email: "super@admin.com",
            phone: 714923586,
            password: "$2a$08$Kp0Jx1keiA4.XYrjoR.EPehj3OmE.WGqgs8F5FrpmPpd9S2.p2Ui2",
            code: "ktImrfGE",
            status: 1,
            creator:1,
            profileId:1
        })
        .then(()=>{
            app_user_profile.create({
                courtId:50,
                zoneId:4,
                status: 1,
                profileId:1,
                roomId:1,
                userId:1,
                
            })
            .then(()=>{
                app_user_role.create({
                    roleId:1,
                    userId:1
                });
            })
        });
    
    
        
    
    
        app_setting.create({
            name:"Project Management System",
            institution:"Judiciary Of Tanzania",
            logo:"logo.jpg",
            website:"www.judiciary.go.tz",
            status:1,
        });
    
    }
}