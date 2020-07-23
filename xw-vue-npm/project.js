 let temp = {
    "Modules": [
        {
        "ModuleName": "Roles",
        "Pages": [
            {
                "pageName": "list.vue",
                "type": "list",
                "pageTitle": "角色管理列表",
                "config": {
                    "searchModel": [
                        {
                            "label": "角色名称",
                            "type": "text",
                            "field": "roleName"
                        },
                        {
                            "label": "角色类型",
                            "type": "select",
                            "field": "roleType",
                            "displayName": "name",
                            "displayValue": "value",
                            "dataSource": "salesRoute"
                        }
                    ],
                    "table": {
                        "url": "/api/getRoleTypes",
                        "showCk":"",
                        "map": [
                            {
                                "field": "channelCode",
                                "label": "Sale Channel"
                            },
                            {
                                "field": "materialNumber",
                                "label": "Material"
                            }
                        ],
                        "page": {
                            "pageSize": "pageSize",
                            "currentPage": "currentPage"
                        }
                    },
                    "toolbar":[
                        {
                            "type":"publish",
                            "value":"发布",
                            "fnName":"publish"
                        },
                        {
                            "type":"import",
                            "value":"导入",
                            "fnName":"import"
                        }
                    ]
                },
                "model":[
                    {
                        "label": "角色类型",
                        "type": "select",
                        "field": "roleType",
                        "displayName": "name",
                        "displayValue": "value",
                        "dataSource": "salesRouteA",
                        "on": true,
                        "required": true,
                        "msg":"必填",
                        "tip":"请输入角色类型"
                    }
                ]
            },
            {
                "pageName": "save.vue",
                "type": "save",
                "model":[
                    {
                        "label": "角色类型",
                        "type": "select",
                        "field": "roleType",
                        "displayName": "name",
                        "displayValue": "value",
                        "dataSource": "salesRouteA",
                        "on": true,
                        "required": true
                    },
                    {
                        "label": "角色名称",
                        "type": "text",
                        "field": "roleName",
                        "on": true,
                        "required": true,
                        "msg":"必填",
                        "tip":"请输入角色类型",
                        "Vtype":""
                    }
                ]
            }
        ],
        "Services": [
            {
                "name":"create",
                "reqType":"post",
                "url": "/api/getRoleTypes",
                "stype":"1",
                "pageName":"list.vue"
            },
            {
                "name":"update",
                "reqType":"post",
                "url": "",
                "stype":"1",
                "pageName":"list.vue"
            },
            {
                "name":"remove",
                "reqType":"post",
                "url": "/api/getRoleTypes",
                "stype":"1",
                "pageName":"list.vue"
            },
            {
                "name":"detail",
                "reqType":"get",
                "url": "/api/getRoleTypes",
                "stype":"1",
                "pageName":"list.vue"
            },
            {
                "name":"querySubItems",
                "reqType":"post",
                "url": "/api/getSubItems",
                "stype":"2",
                "pageName":"list.vue"
            }
        ],
        "Store": {
            "state": [
                {
                    "name": "salesRoute",
                    "type": "array",
                    "url": "/api/getRoleTypes"
                },
                {
                    "name": "salesRoute_A",
                    "type": "array",
                    "reqType":"post",
                    "url": "/api/getRoleTypes"
                },
                {
                    "name": "salesRoute_B",
                    "type": "enum",
                    "url": "KEYS.SALES.ACTION_LIST"
                },
                {
                    "name": "salesRoute_C",
                    "type": "enum",
                    "url": "KEYS.SALES.ACTION_List_C"
                }
            ]
        }
    }],
    "absoultePath": "/Users/wupeng/Documents/aaa"
 }

 module.exports = temp;