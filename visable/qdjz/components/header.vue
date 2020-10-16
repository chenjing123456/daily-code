<template>
    <div class="el-header">
        <div class="header-bg">
            <slot></slot>
            <div>
            </div>
            <!--<div class="header-bg_tip" :class="{'noCursor': from == 'ent'}">-->
                <!--<div-->
                    <!--v-show="from !== 'ent' && navShow!=='index'"-->
                    <!--class="header-module"-->
                    <!--v-for="(item,index) in headerList"-->
                    <!--:key="index"-->
                    <!--:class="{'active':curlIndex==index}"-->
                    <!--@click.stop="(curlIndex =index),handleClick(item)"-->
                <!--&gt;{{item.name}}</div>-->
            <!--</div>-->
            <div class="user-c flex-box">
                
                <el-popover
                    popper-class="notifyPopover"
                    v-if="from === 'ent'"
                    placement="bottom"
                    width="336"
                    v-model="notifyPopoverVisible">

                    <div class="notify_modal">
                        <div class="notify_modal_header"><span>通知(4)</span></div>
                        <div class="notify_modal_body">
                            <div v-for="msg in msgList" class="notify-item flex-box">
                                <i :class="{'el-icon-success': msg.status == 'success', 'el-icon-info': msg.status !== 'success', 'error': msg.status == 'error'}"></i>
                                <div class="notify-item-main flex-box">
                                    <div class="msg-content">{{msg.msg}}</div>
                                    <div class="msg-time">{{msg.createTime}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="notify_modal_footer flex-center">清空通知</div>
                    </div>
                    <div class="notification"  slot="reference">
                        <i class="el-icon-bell"></i>
                    </div>
                </el-popover>


                <el-dropdown :hide-on-click="false">
                    <div class="user-info flex-center">
                        <div class="user-icon">
                            <!-- 头像 -->
                        </div>
                        <div class="user-name">{{name}}</div>
                        <i class="el-icon-caret-bottom" style="color:#fff"></i>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-show="display" @click.native="gotoSetting">系统管理</el-dropdown-item>
                        <el-dropdown-item @click.native="gotoCenter">个人中心</el-dropdown-item>
                        <el-dropdown-item @click.native="signOut">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
    import { gotoBaseURL } from "@/common/utils/index"; //跳转路径
    import { Dropdown, DropdownMenu, DropdownItem } from "element-ui";
    import { getLocalStorage, getLocation, setLocalStorage } from "../common/utils";
    import {logout} from "../common/interface/api/loginOut";

    export default {
        components: {
            "el-dropdown": Dropdown,
            "el-dropdown-menu": DropdownMenu,
            "el-dropdown-item": DropdownItem
        },
        props:{
            navShow:{
                type:String,
                default:''
            },
            from: {
                type: String,
                default: 'gov'
            }
        },
        data() {
            return {
                curlIndex: 0,
                headerList: JSON.parse(getLocalStorage("curl")).filter(item => {
                    return item.url !== "personalCenter.html" && item.url !== "setting.html";
                }),
                name: "",
                id: 0,
                display: false,
                UK: "fhwgrji5huh",
                notifyPopoverVisible: false,
                msgList: [
                    { status: 'success', msg: '你的确认函已通过', createTime: '2019-12-16 15:30'},
                    { status: 'error', msg: '你的确认函已被通过', createTime: '2019-12-16 12:30'},
                    { status: 'error', msg: '你的申诉被驳回', createTime: '2019-12-15 15:30'},
                    { status: 'info', msg: '你的申诉已处理', createTime: '2019-12-14 14:30'},
                ],
            };
        },
        watch: {},
        computed: {},
        methods: {
            //判断权限user
            miss() {
                let key = localStorage.getItem("isAdmin");
                let per = JSON.parse(getLocalStorage("curl")).find(item => {
                    return item.url == "setting.html";
                })
                if (key == 1 || per) {
                    this.display = true;
                }
            },
            signOut() {
                logout().then(res => {
                    if (res.code == "200") {
                        let uk = getLocalStorage(this.UK);
                        if (uk) {                            
                            localStorage.clear();
                            setLocalStorage(this.UK, uk);
                        } else {
                            localStorage.clear();
                        }
                        location.href = "/login.html";
                    } else {
                        this.$message.error(res.messageText || "退出登录失败");
                    }
                });
            },
            gotoIndex() {
                location.href = "/index.html";
            },
            handleClick(route, event) {
                console.log(route);

                this.$emit("reloadAside"); //重新渲染左侧菜单栏
                let child = route.child&&route.child.length>0?route.child[0]:[];
                if (route.url && child.length == 0) {
                    gotoBaseURL(`${route.url}`);
                } else if (child) {
                    gotoBaseURL(`${route.url}#/${child.url}`);
                }
            },
            gotoCenter() {
                location.href = "/personalCenter.html";
            },
            gotoSetting() {
                let route = JSON.parse(getLocalStorage("curl")).find(item => {
                    return item.url == "setting.html";
                })
                let child = route.child&&route.child.length>0?route.child[0]:[];
                gotoBaseURL(`${route.url}#/${child.url}`);
            }
        },

        mounted() {
            this.name = getLocalStorage("username") ? getLocalStorage("username") : "";
            this.miss();
            this.curlIndex = this.headerList.findIndex((v)=>{
                return v.url == getLocation().lastPathname
            })
        }
    };
</script>

<style lang="less" scoped>
    @header_height: 64px;
    .el-header {
        width: 100%;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.1);
        height: @header_height;
        z-index: 999;
        background-color: #ffffff;
    }
    .header-bg {
        display: flex;
        height: 100%;
        width: 100%;
        justify-content: space-between;
    }
    .header-bg_tip {
        background-size: contain;
        min-width: 450px;
        cursor: pointer;
        &.noCursor {
            cursor: default;
        }
        .header-module {
            margin: 0 30px;
            /*padding:0 20px;*/
            height: 100%;
            line-height: @header_height;
            display: inline-block;
            color: #303133;
        }
        .active,
        .header-module:hover {
            /*color:#1B68FD;*/
            color: #1b68fd;
            position: relative;
            &:after {
                position: absolute;
                content: "";
                width: 100%;
                height: 2px;
                background: #1b68fd;
                left: 0;
                bottom: 0;
            }
        }
    }
    .user-icon {
        display: inline-block;
        width: 26px;
        height: @header_height;
        background: url(../assets/images/user-logo.png) no-repeat scroll 50%;

    }
    // 右边用户栏
    .user-c {
        height: 100%;
        text-align: center;
        cursor: pointer;
        min-width: 100px;
        border-left: 1px solid rgba(0, 0, 0, 0.1);
        align-items: center;
        padding: 0 24px;


        .notification {
            width: 40px;
            height: @header_height;
            margin-right: 10px;

            display: flex;
            align-items: center;
            justify-content: center;

            .el-icon-bell {
                font-size: 18px;
                color: rgba(0, 0, 0, 0.65);
            }

            &:hover {
                background-color: #E6F7FF;
            }
        }

        .user-info {
            &:hover {
                background-color: #E6F7FF;
            }
        }
        .user_herder {
            display: inline-block;
            text-align: center;
            width: 26px;
            height: @header_height;
        }
        .user-name {
            height: @header_height;
            line-height: @header_height;
            display: inline-block;
            vertical-align: top;
            margin-left: 10px;
            color: #303133;
        }



    }

    /deep/ .el-popover.el-popper.notifyPopover {
        background-color: red;
        .notify_modal {
            width: 100%;
            &_header {
                height: 50px;
                line-height: 50px;
                width: 80px;
                border-bottom: 1px solid rgba(232, 232, 232, 1);
                span {
                    color: rgba(27, 104, 253, 1);
                    font-size: 14px;
                    font-family: PingFangSC-Medium;
                    border-bottom: 2px solid rgba(27, 104, 253, 1);
                }
            }
            &_body {
                padding: 0 24px;
                height: 350px;
                &::-webkit-scrollbar-thumb {
                    width: 5px;
                    height: 120px;
                    border-radius: 2px;
                    background-color: rgba(0, 0, 0, 0.25);
                }
                &::-webkit-scrollbar-track {
                    background: transparent;
                }
                .notify-item {
                    height: 73px;
                    align-items: center;
                    border-bottom: 1px solid rgba(232, 232, 232, 1);
                    i {
                        font-size: 32px;
                        &.el-icon-success {
                            color: #36CFC9;
                        }
                        &.el-icon-info {
                            color: #5891FF;
                            &.error {
                                color: #FF4D4F;
                            }
                        }
                    }

                    &-main {
                        flex-direction: column;
                    }
                    .msg-content {
                        line-height: 22px;
                        color: rgba(0, 0, 0, 0.65);
                        font-size: 14px;
                        font-family: PingFangSC-Regular;
                    }
                    .msg-time {
                        line-height: 20px;
                        color: rgba(0, 0, 0, 0.45);
                        font-size: 12px;
                        font-family: HelveticaNeue;
                    }
                }
            }
            &_footer {
                height: 47px;
                line-height: 47px;
                color: rgba(0, 0, 0, 0.65);
                cursor: pointer;
            }
        }
    }
</style>