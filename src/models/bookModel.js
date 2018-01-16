import {
    getStore,
    getSaler,
    getCreateFields,
    createBook,
    getBookList,
} from "@/server/book.js"

export default{
    field_list:{
        customername:{
            label:'客户名',
            editorComponent:{
                name:"field_string",
                config:{
                    placeholder:'请输入客户名',
                },
                default:'',
            },
        },
        totalprice:{
            label:'金额',
            editorComponent:{
                name:"field_number",
                default:0,
            },
        },
        address:{
            label:"收货地址",
            editorComponent:{
                name:"field_text",
                default:"",
            },
        },
        store:{
            label:"店铺",
            editorComponent:{
                name:"field_async_enum_select",
                config:{
                    httpRequest:getStore,
                    labelfield:"storename",
                    valuefield:"_id",
                },
                default:"",
            },
        },
        saler:{
            label:"销售",
            editorComponent:{
                name:"field_relates_enum_select",
                config:{
                    relates:[
                        {
                            invalidValue:"",
                            relateField:"store",
                        }
                    ],
                    httpRequest:getSaler,
                },
                default:"",
            },
        },
    },
    staticOperators:[
        {
            component:"create",
            componentPath:"components/common/staticOperators/create",
            config:{
                getCreateFields:getCreateFields,
                doCreateRequest:createBook,
            },
        },
        {
            label:"删除多项",
            type:"danger",
            function(resolve,selection){
                console.log(this.$attrs.formData);
                this.$message({
                    type:"warning",
                    message:"就把选中的取消选中"
                })
                selection.splice(0,selection.length);
                resolve();
            }
        },
        {
            component:"csv",
            componentPath:"components/common/staticOperators/csv",
            config:{
                text:"导入csv数据",
                type:"warning",
                handleData:function(resolve,data){
                    console.log(data);
                    resolve();
                }
            }
        },
    ],
    listConfig:{
        selection:true,
        listRequest:getBookList,
    },
    filters:[
        {
            label:"客户名",
            field:"customername",
            editorComponent:{
                name:"field_string",
                config:{
                    placeholder:"请输入客户名"
                },
                default:"",
            }
        },
        {
            label:"金额",
            field:"totalprice",
            editorComponent:{
                name:"field_number",
                default:500,
            }
        },
    ],
    operators:[
        {
            label:"再来一单",
            type:"success",
            function(data,index,resolve){
                this.$message({
                    message:`${data.customername}再来一单`,
                    type:"success",
                    duration:2000
                });
                setTimeout(()=>{
                    resolve();
                },1000)
            }
        },
    ],
}