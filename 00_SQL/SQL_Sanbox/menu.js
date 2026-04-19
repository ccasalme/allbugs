const inquirer = require('inquirer');
const employeeQueries = require('./queries/employees');
const departmentQueries = require('./queries/departments');
const roleQueries = require('./queries/roles');

async function promptMenu() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Remove an employee',
        'Update a department',
        'Remove a department',
        'Remove a role',
        'View total utilized budget by department',
        'Quit',
      ],
    },
  ]);

  return action;
}

async function handleAction(action) {
  switch (action) {
    case 'View all departments':
      await departmentQueries.viewDepartments();
      break;
    case 'View all roles':
      await roleQueries.viewRoles();
      break;
    case 'View all employees':
      await employeeQueries.viewEmployees();
      break;
    case 'Add a department':
      await departmentQueries.addDepartment();
      break;
    case 'Add a role':
      await roleQueries.addRole();
      break;
    case 'Add an employee':
      await employeeQueries.addEmployee();
      break;
    case 'Update an employee role':
      await employeeQueries.updateEmployeeInfo();
      break;
    case 'Remove an employee':
      await employeeQueries.removeEmployee();
      break;
    case 'Update a department':
      await departmentQueries.updateDepartment();
      break;
    case 'Remove a department':
      await departmentQueries.removeDepartment();
      break;
    case 'Remove a role':
      await roleQueries.removeRole();
      break;
    case 'View total utilized budget by department':
      await departmentQueries.viewTotalBudgetByDepartment();
      break;
    case 'Quit':
      return false;
    default:
      console.log('Unknown option.');
  }

  return true;
}

module.exports = {
  promptMenu,
  handleAction,
};