const path = require('path')
const fs = require('fs-extra')

const inquirer = require('inquirer')
const jetpack = require('fs-jetpack')
const chalk = require('chalk')

const { name: defaultProjectName } = jetpack.inspect(path.resolve())
const pathResolve = path.dirname(__dirname)


inquirer
    .prompt([
        {
            message: 'Project name',
            name: 'project_name',
            type: 'input',
            default: defaultProjectName
        },
        {
            message: 'Select your preferred template',
            name: 'template',
            type: 'list',
            choices: [
                'react',
                'react-ts'
            ]
        },
        {
            message: 'Select packages to install',
            name: 'packages',
            type: 'checkbox',
            choices: [
                'React Router (v6)',
                'React Redux'
            ]
        },
        {
            message: 'Enable git ?',
            name: 'enable_git',
            type: 'confirm',
        },
        {
            message: 'Select your preferred package manager.',
            name: 'package_manager',
            type: 'list',
            choices: [
                'npm',
                'yarn'
            ]
        }

    ])
    .then(({ project_name, template, packages, enable_git, package_manager }) => {
        try {
            const exaConfig = {
                template, 
                packages, 
                enable_git, 
                package_manager
            }

            jetpack
                .dir(project_name)
                .file("exa.config.json", { content: exaConfig })
        
            jetpack.move(path.resolve(__dirname, 'template', 'template-react'), path.resolve(), { overwrite: true })
        } catch (error) {
            throw error
        }
    })