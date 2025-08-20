# React + TypeScript + Vite


Admin Login
      userId: A-0003
      pass  : Naimur123

Faculty Login 
       userId: F-0005
       pass  : Naimur22315

Studen Login
      userId: 2024030001
      psdd  : Naim22315

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


# University Management System - Complete Project Overview
# বিশ্ববিদ্যালয় ব্যবস্থাপনা সিস্টেম - সম্পূর্ণ প্রকল্প পরিচিতি

## 🎯 Project Overview / প্রকল্প পরিচিতি

### English:
This is a comprehensive University Management System built with modern web technologies. The system manages students, faculty, courses, and academic operations with a robust grading system that allows faculty to assign marks and students to view their results.

### Bengali:
এটি একটি আধুনিক ওয়েব প্রযুক্তি দিয়ে তৈরি সম্পূর্ণ বিশ্ববিদ্যালয় ব্যবস্থাপনা সিস্টেম। এই সিস্টেম শিক্ষার্থী, শিক্ষক, কোর্স এবং একাডেমিক কার্যক্রম পরিচালনা করে একটি শক্তিশালী গ্রেডিং সিস্টেমের সাথে যা শিক্ষকদের নম্বর প্রদান এবং শিক্ষার্থীদের ফলাফল দেখার সুবিধা দেয়।

---

## 🏗️ System Architecture / সিস্টেম আর্কিটেকচার

### Technology Stack / প্রযুক্তিগত স্ট্যাক:

**Frontend / ফ্রন্টএন্ড:**
- React.js with TypeScript
- Redux Toolkit for state management
- Ant Design for UI components
- React Router for navigation

**Backend / ব্যাকএন্ড:**
- Node.js with Express.js
- TypeScript for type safety
- MongoDB with Mongoose ODM
- JWT for authentication
- Bcrypt for password hashing

---

## 👥 User Roles & Permissions / ব্যবহারকারীর ভূমিকা ও অনুমতি

### 1. Super Admin / সুপার অ্যাডমিন
**English:** Complete system control, can manage all users and system settings.
**Bengali:** সম্পূর্ণ সিস্টেম নিয়ন্ত্রণ, সকল ব্যবহারকারী এবং সিস্টেম সেটিংস পরিচালনা করতে পারে।

### 2. Admin / অ্যাডমিন
**English:** Manages academic departments, semesters, courses, and user accounts.
**Bengali:** একাডেমিক বিভাগ, সেমিস্টার, কোর্স এবং ব্যবহারকারী অ্যাকাউন্ট পরিচালনা করে।

### 3. Faculty / শিক্ষক
**English:** Can view assigned courses, enrolled students, and assign grades.
**Bengali:** নির্ধারিত কোর্স, ভর্তি শিক্ষার্থী দেখতে এবং গ্রেড প্রদান করতে পারে।

### 4. Student / শিক্ষার্থী
**English:** Can enroll in courses, view schedules, and check results.
**Bengali:** কোর্সে ভর্তি হতে, সময়সূচী দেখতে এবং ফলাফল চেক করতে পারে।

---

## 🎓 Grading System / গ্রেডিং সিস্টেম

### Assessment Components / মূল্যায়ন উপাদান:

| Component / উপাদান | Marks / নম্বর | Percentage / শতাংশ |
|---------------------|----------------|---------------------|
| Class Test 1 / ক্লাস টেস্ট ১ | 10 | 10% |
| Class Test 2 / ক্লাস টেস্ট ২ | 10 | 10% |
| Attendance / উপস্থিতি | 10 | 10% |
| Mid Term / মধ্যবর্তী পরীক্ষা | 30 | 30% |
| Final Term / চূড়ান্ত পরীক্ষা | 40 | 40% |
| **Total / মোট** | **100** | **100%** |

### Grading Scale / গ্রেডিং স্কেল:

| Score Range / নম্বর পরিসর | Letter Grade / অক্ষর গ্রেড | Grade Point / গ্রেড পয়েন্ট |
|---------------------------|---------------------------|---------------------------|
| 80-100 | A+ | 4.00 |
| 75-79 | A | 3.75 |
| 70-74 | A- | 3.50 |
| 65-69 | B+ | 3.25 |
| 60-64 | B | 3.00 |
| 55-59 | B- | 2.75 |
| 50-54 | C+ | 2.50 |
| 45-49 | C | 2.25 |
| 40-44 | D | 2.00 |
| 0-39 | F (Fail) | 0.00 |

---

## 🔄 System Workflow / সিস্টেম কর্মপ্রবাহ

### 1. Course Enrollment Process / কোর্স ভর্তি প্রক্রিয়া

**English:**
1. Admin creates academic semesters and departments
2. Admin adds courses and assigns faculty
3. Students browse and enroll in offered courses
4. System creates enrolled course records

**Bengali:**
১. অ্যাডমিন একাডেমিক সেমিস্টার এবং বিভাগ তৈরি করে
২. অ্যাডমিন কোর্স যোগ করে এবং শিক্ষক নিয়োগ দেয়
৩. শিক্ষার্থীরা প্রস্তাবিত কোর্স ব্রাউজ করে এবং ভর্তি হয়
৪. সিস্টেম ভর্তি কোর্স রেকর্ড তৈরি করে

### 2. Grading Workflow / গ্রেডিং কর্মপ্রবাহ

**English:**
1. Faculty logs into the system
2. Navigates to "My Students" section
3. Selects a course and views enrolled students
4. Clicks "Add Grade" for a specific student
5. Enters marks for all assessment components
6. System automatically calculates total marks and grade
7. Grade is saved and immediately available to student

**Bengali:**
১. শিক্ষক সিস্টেমে লগইন করে
২. "আমার শিক্ষার্থী" বিভাগে যায়
৩. একটি কোর্স নির্বাচন করে এবং ভর্তি শিক্ষার্থী দেখে
৪. নির্দিষ্ট শিক্ষার্থীর জন্য "গ্রেড যোগ করুন" ক্লিক করে
৫. সকল মূল্যায়ন উপাদানের জন্য নম্বর প্রবেশ করায়
৬. সিস্টেম স্বয়ংক্রিয়ভাবে মোট নম্বর এবং গ্রেড গণনা করে
৭. গ্রেড সংরক্ষিত হয় এবং তৎক্ষণাৎ শিক্ষার্থীর কাছে উপলব্ধ হয়

### 3. Result Viewing Process / ফলাফল দেখার প্রক্রিয়া

**English:**
1. Student logs into the system
2. Navigates to "My Results" section
3. Views comprehensive academic results
4. Can filter by semester or course
5. Sees detailed breakdown of marks
6. Views calculated CGPA and academic progress

**Bengali:**
১. শিক্ষার্থী সিস্টেমে লগইন করে
২. "আমার ফলাফল" বিভাগে যায়
৩. বিস্তৃত একাডেমিক ফলাফল দেখে
৪. সেমিস্টার বা কোর্স অনুযায়ী ফিল্টার করতে পারে
৫. নম্বরের বিস্তারিত ভাঙ্গন দেখে
৬. গণনাকৃত সিজিপিএ এবং একাডেমিক অগ্রগতি দেখে

---

## 🛡️ Security Features / নিরাপত্তা বৈশিষ্ট্য

### Authentication / প্রমাণীকরণ:
**English:**
- JWT-based secure authentication
- Role-based access control
- Password encryption with bcrypt
- Session management with token refresh

**Bengali:**
- JWT-ভিত্তিক নিরাপদ প্রমাণীকরণ
- ভূমিকা-ভিত্তিক অ্যাক্সেস নিয়ন্ত্রণ
- bcrypt দিয়ে পাসওয়ার্ড এনক্রিপশন
- টোকেন রিফ্রেশ সহ সেশন ব্যবস্থাপনা

### Data Protection / ডেটা সুরক্ষা:
**English:**
- Input validation and sanitization
- Protected API endpoints
- Secure database queries
- Error handling without data exposure

**Bengali:**
- ইনপুট যাচাইকরণ এবং স্যানিটাইজেশন
- সুরক্ষিত API এন্ডপয়েন্ট
- নিরাপদ ডেটাবেস কোয়েরি
- ডেটা প্রকাশ ছাড়াই ত্রুটি হ্যান্ডলিং

---

## 📊 Database Structure / ডেটাবেস কাঠামো

### Core Collections / মূল কালেকশন:

1. **Users / ব্যবহারকারী**: Base user information
2. **Students / শিক্ষার্থী**: Student-specific data
3. **Faculty / শিক্ষক**: Faculty-specific data
4. **Courses / কোর্স**: Course information
5. **EnrolledCourses / ভর্তি কোর্স**: Student enrollments with grades
6. **OfferedCourses / প্রস্তাবিত কোর্স**: Available courses per semester
7. **AcademicSemesters / একাডেমিক সেমিস্টার**: Semester management
8. **AcademicDepartments / একাডেমিক বিভাগ**: Department structure

---

## 🎨 User Interface Features / ব্যবহারকারী ইন্টারফেস বৈশিষ্ট্য

### Faculty Dashboard / শিক্ষক ড্যাশবোর্ড:
**English:**
- Clean, intuitive grading interface
- Real-time grade calculation
- Student progress tracking
- Course management tools

**Bengali:**
- পরিষ্কার, স্বজ্ঞাত গ্রেডিং ইন্টারফেস
- রিয়েল-টাইম গ্রেড গণনা
- শিক্ষার্থী অগ্রগতি ট্র্যাকিং
- কোর্স ব্যবস্থাপনা সরঞ্জাম

### Student Dashboard / শিক্ষার্থী ড্যাশবোর্ড:
**English:**
- Comprehensive results display
- Interactive grade visualization
- CGPA calculation and tracking
- Academic progress charts

**Bengali:**
- বিস্তৃত ফলাফল প্রদর্শন
- ইন্টারঅ্যাক্টিভ গ্রেড ভিজুয়ালাইজেশন
- সিজিপিএ গণনা এবং ট্র্যাকিং
- একাডেমিক অগ্রগতি চার্ট

---

## 🚀 Key Achievements / মূল অর্জন

### English:
1. **Automated Grade Calculation**: Eliminates manual calculation errors
2. **Real-time Updates**: Instant grade availability for students
3. **Role-based Security**: Ensures data privacy and access control
4. **Scalable Architecture**: Can handle thousands of users
5. **User-friendly Interface**: Intuitive design for all user types
6. **Comprehensive Reporting**: Detailed academic analytics

### Bengali:
১. **স্বয়ংক্রিয় গ্রেড গণনা**: ম্যানুয়াল গণনার ত্রুটি দূর করে
২. **রিয়েল-টাইম আপডেট**: শিক্ষার্থীদের জন্য তাৎক্ষণিক গ্রেড উপলব্ধতা
৩. **ভূমিকা-ভিত্তিক নিরাপত্তা**: ডেটা গোপনীয়তা এবং অ্যাক্সেস নিয়ন্ত্রণ নিশ্চিত করে
৪. **স্কেলেবল আর্কিটেকচার**: হাজার হাজার ব্যবহারকারী পরিচালনা করতে পারে
৫. **ব্যবহারকারী-বান্ধব ইন্টারফেস**: সকল ব্যবহারকারীর জন্য স্বজ্ঞাত ডিজাইন
৬. **বিস্তৃত রিপোর্টিং**: বিস্তারিত একাডেমিক বিশ্লেষণ

---

## 🔮 Future Enhancements / ভবিষ্যত উন্নতি

### English:
- Mobile application development
- Advanced analytics and reporting
- Integration with external systems
- Automated attendance tracking
- Online examination system
- Parent portal for guardians

### Bengali:
- মোবাইল অ্যাপ্লিকেশন উন্নয়ন
- উন্নত বিশ্লেষণ এবং রিপোর্টিং
- বাহ্যিক সিস্টেমের সাথে একীকরণ
- স্বয়ংক্রিয় উপস্থিতি ট্র্যাকিং
- অনলাইন পরীক্ষা সিস্টেম
- অভিভাবকদের জন্য অভিভাবক পোর্টাল

---

## 📈 System Benefits / সিস্টেমের সুবিধা

### For Educational Institutions / শিক্ষা প্রতিষ্ঠানের জন্য:
**English:**
- Streamlined academic operations
- Reduced administrative workload
- Improved data accuracy
- Enhanced student experience
- Better academic tracking

**Bengali:**
- সুশৃঙ্খল একাডেমিক কার্যক্রম
- প্রশাসনিক কাজের চাপ কমানো
- উন্নত ডেটা নির্ভুলতা
- উন্নত শিক্ষার্থী অভিজ্ঞতা
- উন্নত একাডেমিক ট্র্যাকিং

---

## 🎯 Conclusion / উপসংহার

### English:
This University Management System represents a modern, comprehensive solution for academic institutions. With its robust grading system, secure authentication, and user-friendly interfaces, it streamlines educational operations while maintaining high standards of data security and user experience.

### Bengali:
এই বিশ্ববিদ্যালয় ব্যবস্থাপনা সিস্টেম একাডেমিক প্রতিষ্ঠানের জন্য একটি আধুনিক, সম্পূর্ণ সমাধান প্রতিনিধিত্ব করে। এর শক্তিশালী গ্রেডিং সিস্টেম, নিরাপদ প্রমাণীকরণ এবং ব্যবহারকারী-বান্ধব ইন্টারফেসের সাথে, এটি ডেটা নিরাপত্তা এবং ব্যবহারকারীর অভিজ্ঞতার উচ্চ মান বজায় রেখে শিক্ষাগত কার্যক্রম সুশৃঙ্খল করে।

---

**Thank you for your attention! / আপনার মনোযোগের জন্য ধন্যবাদ!**
