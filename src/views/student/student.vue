<template>
    <div>
        <el-row>
            <el-col :span="5">
                <div class="grid-content bg-purple">
                    <h3>班级列表</h3>
                    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" highlight-current>
                    </el-tree>
                </div>
            </el-col>
            <el-col :span="16">
                <div class="grid-content bg-purple-light">
                    <el-form inline size="mini">
                        <el-form-item label="姓名">
                            <el-input v-model="studentSearchForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="手机">
                            <el-input v-model="studentSearchForm.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="专业">
                            <el-select v-model="studentSearchForm.major_id" placeholder="请选择">
                                <el-option v-for="item in studentMajor" :key="item.major_id" :label="item.name"
                                    :value="item.major_id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="handleSearch">查询</el-button>
                            <el-button type="info" @click="handleReset">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div>
                    <el-form>
                        <el-button type="text" @click="handleAdd"><i class="el-icon-plus"></i>添加</el-button>
                    </el-form>
                </div>
                <el-table border :data="studentList">
                    <el-table-column type="index" label="#"></el-table-column>
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <el-table-column prop="" label="性别"></el-table-column>
                    <el-table-column prop="" label="年龄"></el-table-column>
                    <el-table-column prop="" label="手机"></el-table-column>
                    <el-table-column prop="" label="专业"></el-table-column>
                    <el-table-column prop="" label="操作"></el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-dialog title="添加" :visible.sync="dialogVisible" width="60%" center>
            <el-row type="flex" justify="center">
                <el-form size="mini">
                    <el-form-item label="班级" inline>
                        <el-button type="primary" @click="handleChoice">请选择班级</el-button>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item label="手机">
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item label="专业">
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item label="爱好">
                        <el-input></el-input>
                    </el-form-item>
                </el-form>
            </el-row>
        </el-dialog>
    </div>
</template>
<script>
import { classlist } from '@/api/getClass'
import { studentlist } from '@/api/getClass'
import { studentMajor } from '@/api/getClass'
export default {
    data() {
        return {
            data: [],
            defaultProps: {
                label: 'name'
            },
            studentList: [],
            studentSearchForm: {},
            major_id: '',
            studentMajor: [],
            dialogVisible: false
        };
    },
    created() {
        this.handleNodeClick()
        this.getClassList()
        this.getStudentMajor()
        this.handleChoice()
    },
    methods: {
        getClassList() {
            classlist().then((res) => {
                if (res.success) {
                    this.data = res.data
                }
            }).catch((err) => {
                console.error(err);
            })
        },
        handleNodeClick(data) {
           this.getStudentList()
        },
        getStudentList() {
            studentlist({
                limit: 10,
                offset: 1,
                ...this.studentSearchForm
            }).then((res) => {
                if (res.success) {
                    this.studentList = res.data.rows
                    console.log(res.data.rows);
                }
            }).catch((err) => {
                console.error(err);
            })
        },
        getStudentMajor() {
            studentMajor().then((res) => {
                console.log(res);
                if (res.success) {
                    this.studentMajor = res.data
                }
            }).catch((err) => {
                console.error(err);
            })
        },
        handleSearch() {
            let isEmpty = true
            for (const key in this.studentSearchForm) {
                if (this.studentSearchForm[key].toString().length > 0) {
                    isEmpty = false
                }
            }
            if (isEmpty) {
                this.$message.warning('请输入至少一个条件')
            } else {
                this.getStudentList()
            }
        },
        handleAdd() {
            console.log('fsdfsdafdsfasfdsafdsafdsafasfsad');
            this.dialogVisible = true
        },
        handleReset() {
            this.studentSearchForm = {}
            this.getStudentList()
        },
        handleChoice(){
            console.log(11);
        }

    }
};
</script>
<style lang="scss" scoped>
h3 {
    text-align: center;
}
</style>