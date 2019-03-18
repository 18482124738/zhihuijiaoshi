export default [
  // account
  {
    path: '/account',
    component: '../layouts/AccountLayout',
    routes: [
      {
        path: '/account',
        redirect: '/account/login',
      },
      {
        path: '/account/login',
        component: './login',
      },
      {
        path: '/account/register',
        component: './login/register',
      },
      {
        path: '/account/WeChatLogin',
        component: './login/WeChatLogin',
      },
    ],
  },
  {
    path: '/nolayout',
    component: '../layouts/emptyLayout',
    routes: [
      {
        path: '/nolayout',
        redirect: '/nolayout/news',
      },
      {
        path: '/nolayout/news',
        component: './news',
      },
      {
        path: '/nolayout/my',
        component: './my',
      },
      {
        path: '/nolayout/home',
        component: './home',
      },
      {
        path: '/nolayout/class',
        component: './class',
      },
      {
        path: '/nolayout/teacher/test',
        component: './teacher/test',
      },
      {
        path: '/nolayout/teacher/my',
        component: './teacher/my',
      },
      {
        path: '/nolayout/teacher/issued',
        component: './teacher/issued',
      },
      {
        path: '/nolayout/teacher/issued/studentTestDetail',
        component: './teacher/issued/studentTestDetail',
      },
      {
        path: '/nolayout/teacher/issued/studentTestDetail/studentSelfDetail',
        component: './teacher/issued/studentTestDetail/studentSelfDetail',
      },
      {
        path: '/nolayout/teacher/createCourse', // 创建课程
        component: './teacher/CreateCourse',
      },
      {
        path: '/nolayout/teacher/changeCourse', // 切换课程
        component: './teacher/ChangeCourse',
      },
      {
        path: '/nolayout/teacher/teacherHistorical', // 历史记录
        component: './teacher/TeacherHistorical',
      },
      {
        path: '/nolayout/teacher/teacherHistorical/singleDetail', // 历史记录——记录单个详情
        component: './teacher/TeacherHistorical/SingleDetail',
      },
      {
        path: '/nolayout/teacher/infoIssuance', // 资料下发
        component: './teacher/InfoIssuance',
      },
      {
        path: '/nolayout/teacher/infoIssuance/specificDocuments', // 具体资料下发
        component: './teacher/InfoIssuance/SpecificDocuments',
      },
      {
        path: '/nolayout/teacher/teacherDiscussion', // 分组讨论
        component: './teacher/TeacherDiscussion',
      },
      {
        path: '/nolayout/teacher/teacherDiscussion/concreteDiscussion', // 具体讨论
        component: './teacher/TeacherDiscussion/ConcreteDiscussion',
      },
      {
        path: '/nolayout/teacher/inClassRecord', // 随堂记录
        component: './teacher/InClassRecord',
      },
      {
        path: '/nolayout/teacher/attendance', // 课堂考勤
        component: './teacher/Attendance',
      },
      {
        path: '/nolayout/teacher/classPortrait', // 班级画像
        component: './teacher/ClassPortrait',
      },
      {
        path: '/nolayout/student/votingRate', // 投票打分
        component: './student/VotingRate',
      },
      {
        path: '/nolayout/student/changeClass', // 切换课程
        component: './student/ChangeClass',
      },
      {
        path: '/nolayout/student/studentHistorical', // 历史记录
        component: './student/StudentHistorical',
      },
      {
        path: '/nolayout/student/studentHistorical/singleDetail', // 历史记录——记录单个详情
        component: './student/StudentHistorical/SingleDetail',
      },
      {
        path: '/nolayout/student/dataDownload', // 资料下载
        component: './student/DataDownload',
      },
      {
        path: '/nolayout/student/studentDiscussion', // 分组讨论
        component: './student/StudentDiscussion',
      },
      {
        path: '/nolayout/student/studentDiscussion/concreteDiscussion', // 具体讨论
        component: './student/StudentDiscussion/ConcreteDiscussion',
      },
      {
        path: '/nolayout/student/test/studentSelfDetail',
        component: './student/test/studentSelfDetail',
      },
      {
        path: '/nolayout/teacher/issued/testAllDetail',
        component: './teacher/issued/testAllDetail',
      },
      {
        path: '/nolayout/teacher/my/personalInformation',
        component: './teacher/my/personalInformation',
      },
      {
        path: '/nolayout/teacher/my/teacherID',
        component: './teacher/my/teacherID',
      },
      {
        path: '/nolayout/teacher/my/gender',
        component: './teacher/my/gender',
      },
      {
        path: '/nolayout/teacher/my/actualName',
        component: './teacher/my/actualName',
      },
      {
        path: '/nolayout/student/test',
        component: './student/test',
      },
      {
        path: '/nolayout/student/test/startExamination',
        component: './student/test/startExamination',
      },
      {
        path: '/nolayout/student/my',
        component: './student/my',
      },
      {
        path: '/nolayout/student/my/personalInformation',
        component: './student/my/personalInformation',
      },
      {
        path: '/nolayout/student/my/actualName',
        component: './student/my/actualName',
      },
      {
        path: '/nolayout/student/my/gender',
        component: './student/my/gender',
      },
      {
        path: '/nolayout/student/my/studentID',
        component: './student/my/studentID',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/baseLayout',
    routes: [
      {
        path: '/',
        redirect: './my',
      },
      {
        path: '/my',
        component: './my',
      },
      {
        path: '/home',
        component: './home',
      },
      {
        path: '/class',
        component: './class',
      },
      {
        path: '/teacher/test',
        component: './teacher/test',
      },
      {
        path: '/teacher/my',
        component: './teacher/my',
      },
      {
        path: '/teacher/home', // 教师首页
        component: './teacher/',
      },
      {
        path: '/teacher/my/personalInformation',
        component: './teacher/my/personalInformation',
      },
      {
        path: '/teacher/my/teacherID',
        component: './teacher/my/teacherID',
      },
      {
        path: '/teacher/my/gender',
        component: './teacher/my/gender',
      },
      {
        path: '/teacher/my/actualName',
        component: './teacher/my/actualName',
      },
      {
        path: '/teacher/issued',
        component: './teacher/issued',
      },
      {
        path: '/student/test',
        component: './student/test',
      },
      {
        path: '/student/my',
        component: './student/my',
      },
      {
        path: '/student/home', // 学生首页
        component: './student/',
      },
      {
        path: '/student/myPortrait', // 我的画像
        component: './student/MyPortrait',
      },
      {
        path: '/student/my/personalInformation',
        component: './student/my/personalInformation',
      },
      {
        path: '/student/my/actualName',
        component: './student/my/actualName',
      },
      {
        path: '/student/my/gender',
        component: './student/my/gender',
      },
      {
        path: '/student/my/studentID',
        component: './student/my/studentID',
      },
    ],
  },
];
