<template>
    <div class="main_page">
        <!-- 1 -->
        <div>
           <el-form :inline='true' size="mini">
                <el-form-item label="班级名称">
                    <el-input v-model="classSearchForm.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSearch">查询</el-button>
                    <el-button type="info" @click="handleReset">重置</el-button>
                </el-form-item>
           </el-form>
        </div>
        <!-- 2 -->
        <div>
            <el-button type="text" @click="showDialog('create')"><i class="el-icon-plus"></i>添加</el-button>
        </div>
        <!-- 3 -->
        <div>
            <el-table :data="classlist" border>
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column label="班级名" prop="name"></el-table-column>
                <el-table-column label="操作">
                    <template #default="scope"> 
                        <el-button type="primary" size="mini" @click="handleClassEdit({...scope.row})"><i class="el-icon-edit"></i>编辑</el-button>
                        <el-button type="danger" size="mini"  @click="handleDestroy({...scope.row})"><i class="el-icon-delete"></i>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 4 -->
        <el-row type="flex" justify="center">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="paginationManage.currentPage"
            :page-sizes="[5, 10, 20]"
            :page-size="paginationManage.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="paginationManage.total">
          </el-pagination>
        </el-row>
        <!-- 5 -->
        <el-dialog :visible.sync="dialogVisible"  @close="handleDialogClose">
            <template #title>
                <span v-show="dialogMode==='create'">添加</span>
                <span v-show="dialogMode==='edit'">编辑</span>
            </template>
            <el-row type="flex" justify="center">
                <el-form ref="classForm" :model="classForm" :rules="classFormRules" style="width:400px">
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="classForm.name"></el-input>
                    </el-form-item>
                </el-form>
            </el-row>
            <template>
                <el-row type="flex" justify="center">
                    <el-button type="primary" @click="handleSubmit">确定</el-button>
                    <el-button @click="dialogVisible=false">取消</el-button>
                </el-row>
            </template>
        </el-dialog>
    </div>
</template>
<script>
import {getClass} from '@/api/getClass'
import {createClass} from '@/api/getClass'
import {editClass} from '@/api/getClass'
import {destroyClass} from '@/api/getClass'

export default {
    data() {
        return {
            classSearchForm:{},
            classlist:[],
            paginationManage:{
                total:0,   //总条数
                pageSize:5,  //每页显示条数
                currentPage:1  //当前页码
            },
            dialogVisible:false,
            classForm:{},
            classFormRules:{
                name:[{required:true,message:'请输入班级名称'}]
            },
            dialogMode:'create'
        }
    },
    created(){
        this.getClasslist()
    },
    methods:{
        getClasslist(){
            getClass({
                limit:this.paginationManage.pageSize,
                offset:this.paginationManage.currentPage,
                ...this.classSearchForm
            }).then((res)=>{
                if(res.success){
                    this.classlist=res.data.rows
                    this.paginationManage.total=res.data.count
                }
            }).catch((err)=>{
                console.error(err);
            })
        },
        handleSizeChange(val){
            this.paginationManage.pageSize=val
            this.getClasslist()
        },
        handleCurrentChange(val){
            this.paginationManage.currentPage=val
            this.getClasslist()
        },
        handleSearch(){
            let isEmpty=true
            for(const key in this.classSearchForm){
                if(this.classSearchForm[key].toString().length>0){
                    isEmpty=false
                }
        }
        if(isEmpty){
            this.$message.warning('请输入至少一个条件')
        }else{
            this.getClasslist()
        }
    },
    handleReset(){
        this.classSearchForm={},
        this.getClasslist()
    },
    handleDialogClose(){
        this.classForm={}
        this.$refs['classForm'].resetFields()
    },
    handleSubmit(){
        this.$refs['classForm'].validate(async(valid)=>{
            if(valid){
                let result=null
                try{
                    switch(this.dialogMode){
                    case 'create':
                //     createClass(this.classForm).then((res)=>{
                //     console.log(res);
                //     if(res.success){
                //         this.dialogVisible=false
                //         this.getClasslist()
                //     }
                // }).catch((err)=>{
                //     console.error(err);
                // })
                result=await createClass(this.classForm)
                        break
                    case 'edit':
                //     editClass(this.classForm).then((res)=>{
                //     console.log(res);
                //     if(res.success){
                //         this.dialogVisible=false
                //         this.getClasslist()
                //     }
                // }).catch((err)=>{
                //     console.error(err);
                // })
                result=await editClass(this.classForm)
                        break
                }
                if(result.success){
                    this.dialogVisible=false
                    this.getClasslist()
                    if(this.dialogMode==='create') this.$message.success('添加成功')
                    if(this.dialogMode==='edit') this.$message.success('修改成功')
                }
                console.log(result);
                }catch(e){
                    console.error(e);
                    if(this.dialogMode==='create') this.$message.error('添加失败')
                    if(this.dialogMode==='edit') this.$message.error('修改失败')
                }
            }
        })
    },
    handleClassEdit(row){
        this.classForm=row
        this.showDialog('edit')
    },
    showDialog(dialogMode){
        this.dialogMode=dialogMode
        this.dialogVisible=true
    },
    handleDestroy(row){
        this.$confirm(`确定删除${row.name}吗`,{
            title:'提示',
            type:'warning'
        }).then(()=>{
            destroyClass({
            id:row.id
        }).then((res)=>{
            if(res.success){
                this.$message.success('删除成功')
                this.getClasslist()
            }
        }).catch((err)=>{
            console.error(err);
        })
        })
       
    }
    }
}
</script>
<style>

</style>