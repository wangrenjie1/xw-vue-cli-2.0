 let temp = {
    "Modules": [
        {
        "ModuleName": "Roles",
        "Pages": [
            {
                "PageName": "list.vue",
                "type": "list",
                "PageTitle": "角色管理列表",
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
                    }
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
                        "required": true
                    }
                ]
            },
            {
                "PageName": "save.vue",
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
                        "field": "roleName"
                    }
                ]
            }
        ],
        "Services": {
            "create": {
                "reqType":"post",
                "url": "/api/getRoleTypes"
            },
            "update": {
                "reqType":"post",
                "url": ""
            },
            "remove": {
                "reqType":"post",
                "url": "/api/getRoleTypes"
            },
            "detail": {
                "url": "/api/getRoleTypes"
            },
            "list": {
                "url": "/api/getRoleTypes"
            },
            "querySubItems":{
                "url": "/api/getSubItems"
            }
        },
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
    }]
}

module.exports = temp;