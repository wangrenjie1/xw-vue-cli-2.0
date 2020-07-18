
const fsTool = require("../tool/fsapi.js");
const ejs = require("ejs");
const NPath = require("path");

let APIhelper = {
    //获取文件名(去掉后缀)
    getFileName(str){
        if(!str){
            return "";
        }
        return str.substring(0,str.indexOf('.'));
    },
    //首字母大写
    firstChatUpperLower(str,flag){
        if(!str){
            return "";
        }
        let first  = str.substring(0,1);
        let other = str.substring(1);
        if(flag){
            return first.toUpperCase() + other;
        }else{
            return first.toLowerCase() + other;
        }
        
    },
    //为单个model.js准备数据
    getMoldeDataFromPageItem(item, moduleName){
        let tmp = {className:"",data:[]};
        let pageName = item.pageName;
        tmp.className = this.firstChatUpperLower(moduleName, true) + this.firstChatUpperLower(this.getFileName(pageName),true) + "Model";
        item.model.forEach(x=>{
            tmp.data.push(x.field);
        })
        return tmp;
    },
    compileByData(ejsPath, data){
        let path = NPath.resolve(__dirname, ejsPath);
        let ejsStr = fsTool.file.readFile(path);
        return ejs.compile(ejsStr)(data);
    },
    //创建单个Module下的Model文件, 并且写入数据
    createModelFile(projectPath, pages, moduleName){
        //create model file
        let path = projectPath + "/src/model/";
        pages.forEach( item => {
            if(item.model){
                let pageName = item.pageName;
                
                let filePath = path + this.firstChatUpperLower(moduleName,false) + this.firstChatUpperLower(this.getFileName(pageName), true) + "Model.js";
                fsTool.file.createFile(filePath);
                
                let res = this.getMoldeDataFromPageItem(item, moduleName);
                //write content to file by ejs
                let _data = this.compileByData("../ejstemplates/model.ejs",{data:res});
                fsTool.file.writeFile(filePath, _data);
            }
        });
    },
    //创建单个Module下的Service文件, 并且写入数据
    createServiceFile(projectPath, serviceItem, storeItems, moduleName){
        //create model file
        let path = projectPath + "/src/services/";
        let filePath = path + this.firstChatUpperLower(moduleName,false) + "Services.js";
        fsTool.file.createFile(filePath);

        let maps = [];
        serviceItem.forEach(x=>{
            if(x.url){
                maps.push({name:x.name, url:x.url, isEnum:false, fnName:x.name,isGetReq:x.reqType == 'post'?false:true});
            }
        })
        storeItems.forEach(x=>{
            maps.push({name:x.name, url:x.url, isEnum: x.type =='enum',fnName: "get"+this.firstChatUpperLower(x.name, true), isGetReq:x.reqType == 'post'?false:true});
        })

        let resJson = {map:[], fns:[]};
        maps.forEach(x=>{
            if(!x.isEnum){
                resJson.map.push(x);
            }
            if(x.url){
                resJson.fns.push({fnName:x.fnName, url:x.url,mapKey:x.name, isEnum: x.isEnum, isGetReq:x.reqType == 'post'?false:true});
            }
        })
        
        //write content to file by ejs
        let _data = this.compileByData("../ejstemplates/service.ejs",{data: resJson});
        fsTool.file.writeFile(filePath, _data);
    },
    //创建单个Module下的Helper文件
    createHelperFile(projectPath, moduleName){
        let path = projectPath + "/src/helper/";
        let filePath = path + this.firstChatUpperLower(moduleName, false) + "Helper.js";
        fsTool.file.createFile(filePath);

        //write content to file
        let _data = this.compileByData("../ejstemplates/helper.ejs",{data: {}});
        fsTool.file.writeFile(filePath, _data);
    },
    //创建单个Module下的Store文件, 并且写入数据
    createStoreFile(projectPath, storeItems, moduleName){
        let path = projectPath + "/src/store/modules/";
        let filePath = path + this.firstChatUpperLower(moduleName, false) + ".js"; 
        fsTool.file.createFile(filePath);

        let stateKeys = [];
        let mutations = [];
        let actions = [];
        let servicesClassName = this.firstChatUpperLower(moduleName, true) + "Services";
        let servicesPath = this.firstChatUpperLower(moduleName, false) + "Services.js";
        storeItems.forEach(x=>{
            stateKeys.push(x.name);
            mutations.push("set"+x.name);
            actions.push({fnName:"get"+x.name, stateKey:x.name,commitFnName:"set"+x.name, serviceFnName:'get'+x.name});
        })
        let data = {
            servicesClassName,
            servicesPath,
            stateKeys,
            mutations,
            actions
        }
        debugger
        //write content to file
        let _data = this.compileByData("../ejstemplates/store/store.module.ejs",{data: data});
        fsTool.file.writeFile(filePath, _data);
    },
    //写入Store Index入口文件
    writeStoreIndex(projectPath, storeKeys){
        let filePath = projectPath + "/src/store/index.js";

        let fileNames = [];
        let StoreNames = [];
        storeKeys.forEach(x=>{
            fileNames.push(this.firstChatUpperLower(x, false) + ".js");
            StoreNames.push(this.firstChatUpperLower(x, true) + "Store");
        })
        
        fsTool.file.writeFile(filePath, fileNames.join(';') + StoreNames.join(';'));
    },
    //写入Route Index入口文件
    writeRouter(projectPath, pages){
        let filePath = projectPath + "/src/route/index.js";
        let paths = [];
        let names = [];
        let componentPath = [];

        pages.forEach(x=>{
            let modelName = this.firstChatUpperLower(x.moduleName, false);
            let _path = modelName + this.firstChatUpperLower(this.getFileName(x.pageName),false);
            paths.push("/" + _path);
            names.push(_path);
            componentPath.push(modelName + "/" + x.pageName);
        })

        fsTool.file.writeFile(filePath, paths.join(';') + componentPath.join(';'));
    },
    //创建view文件，并且准备数据(维度：Module)
    createView(projectPath, pages, moduleName){
        let filePath = projectPath + "/src/pages/views";
        let modulePath = filePath + "/" + this.firstChatUpperLower(moduleName, false);
        //创建Module文件夹
        fsTool.folder.createFolder(modulePath);

        pages.forEach(x=>{
            let vuePath = modulePath + "/" + this.firstChatUpperLower(x.pageName, false);
            //创建vue文件
            fsTool.file.createFile(vuePath);
            
            let pageData = this.dataForListView(x, moduleName);
            fsTool.file.writeFile(vuePath, JSON.stringify(pageData));
        })
    },
    getStoreInPage(page){
        let storeKeys = [];
        if(page.type == "list"){
            //check searchModel
            let searchModels = page.config.searchModel;
            searchModels.forEach(x=>{
                if(x.dataSource){
                    storeKeys.push(x.dataSource);
                }
            })
            let models = page.model;
            models.forEach(x=>{
                if(x.dataSource){
                    storeKeys.push(x.dataSource);
                }
            })
        }else{
            let models = page.model;
            models.forEach(x=>{
                if(x.dataSource){
                    storeKeys.push(x.dataSource);
                }
            })
        }
        return Array.from(new Set(storeKeys));
    },
    dataForListView(page, moduleName){
        let pageTitle = page.pageTitle?page.pageTitle:"";
        let searchModel = page.config?page.config.searchModel:[];
        let pageOpts = page.config?JSON.stringify(page.config.table):"";
        let tableTitle = this.firstChatUpperLower(moduleName, true)+ " " + this.firstChatUpperLower(this.getFileName(page.pageName),true) + " Table List";
        let componentName = this.firstChatUpperLower(moduleName,true) + this.firstChatUpperLower(this.getFileName(page.pageName),true);

        let storeKeys = this.getStoreInPage(page);
        let hasStore = false;
        let storeName = "";
        let StoreActions = [];
        if(storeKeys.length != 0){
            hasStore = true;
            storeName = this.firstChatUpperLower(moduleName, true) + "Store";
            storeKeys.forEach(x=>{
                StoreActions.push("get" + this.firstChatUpperLower(x,true));
            })
        }

        let serviceFileName = this.firstChatUpperLower(moduleName,false) + "Services.js";
        let serviceClassName = this.firstChatUpperLower(moduleName,true) + "Services";
        let modelFileName = this.firstChatUpperLower(moduleName,false) + this.firstChatUpperLower(this.getFileName(page.pageName), true) + "Model.js";
        let modelClassName = this.firstChatUpperLower(moduleName,true) + this.firstChatUpperLower(this.getFileName(page.pageName), true) + "Model";
        let modelDataName = this.firstChatUpperLower(modelClassName,false);
        let modelKeys = page.model?page.model:[];
        let data = {
            pageTitle,
            searchModel,
            pageOpts,
            tableTitle,
            componentName,
            hasStore,
            store:{
                storeKeys,
                storeName,
                StoreActions
            },
            service:{
                serviceFileName,
                serviceClassName
            },
            model:{
                modelFileName,
                modelClassName,
                modelDataName,
                modelKeys
            }
        }
        
        return data;
    }

}


module.exports = APIhelper;