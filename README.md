# momentum-abstract-site
Display our design data

# Document

## localization

### Translate words in code

+ 1. run ```npm run i18n``` to genrate messages.json in ```src/locale```

+ 2. update the other messages.[language].json

## Add documents

+ Go to ```src/data/en-US``` to create .md files or directories.

+ The file name and directory name should follow the format ```[index].[name]```.

+ Go to the directory for other lanuages such as ```src/data/zh```.

+ Translate name of the files and directories in the other language folder, keep the same ```[index].``` number.

# Develop

## Generate

### page

+ To create component and module under ```src/app```

```npm run gen type=_nav name=[component name]```

### sub page

+ To create component, route and module under ```src/app/[typeName]```

```npm run gen type=[typeName] name=[component name]```

### componenets

+ To create component and module under ```src/components```

```npm run gen type=_nav name=[component name]```

# Other command

## Build

```npm run build```

## Start

```npm run start```

## Generate html from markdown

```npm run content```
