module.exports.Roles = [
    'Su',
    'Admin',
    'AdminUser',
    'Employee',
    'User',
]
module.exports.AppAdminRoles = [
    'Admin'
];
module.exports.AppAdminUserRoles = [
    'Manager',
    'FinanceManager',
    'ServiceBoy'
];
module.exports.AppEmployeeRoles = [
    'Employee'
];
module.exports.AppUserRoles = [
    'User'
];

//Employee can be of many types like lets call them designations and to maintain that we will create a employeeDesignation Table with its type

//Employee Designation
// 1. HR
// 2. Accounts
// 3. Marketing
// 4. Business Developers
// 5. Developers : Developer will have again its types lets consider working technologies
// 6. Digital Marketing :
// 7. 

//Employee Type
// 1. Jr.
// 2. Sr.
// 3. Intern
// 4. 
