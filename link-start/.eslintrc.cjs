module.exports = {
    extends: [
        // add more generic rule sets here, such as:
        // 'eslint:recommended',
        // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
        "plugin:@typescript-eslint/recommended",
        "plugin:vue/vue3-recommended",
    ],
    parser       : "vue-eslint-parser",
    parserOptions: {
        parser: "@typescript-eslint/parser",
    },
    plugins: ["@typescript-eslint"],
    root   : true,
    rules  : {
        // Note: you must disable the base rule as it can report incorrect errors
        "semi"                             : "off",
        "@typescript-eslint/semi"          : ["warn", "never"],
        // ts-rules
        // Note: you must disable the base rule as it can report incorrect errors
        "no-unused-vars"                   : "off",
        "@typescript-eslint/no-unused-vars": [
            "warn",
            {
                varsIgnorePattern: "^_",
                argsIgnorePattern: "^_",
            },
        ],
        complexity                               : ["error", 10],
        // Note: you must disable the base rule as it can report incorrect errors
        "object-curly-spacing"                   : "off",
        "@typescript-eslint/object-curly-spacing": ["warn", "always"],
        // Note: you must disable the base rule as it can report incorrect errors
        quotes                                   : "off",
        // Note: you must disable the base rule as it can report incorrect errors
        indent                                   : "off",
        "@typescript-eslint/indent"              : ["warn", 4],
        "@typescript-eslint/quotes"              : ["warn", "double"],
        "no-multi-spaces"                        : [
            "warn",
            {
                exceptions: {
                    ImportDeclaration : true,
                    VariableDeclarator: true,
                    Property          : true,
                },
            },
        ],
        // Note: you must disable the base rule as it can report incorrect errors
        "comma-dangle"                   : "off",
        "@typescript-eslint/comma-dangle": [
            "warn", // warn
            {
                arrays   : "always-multiline",
                objects  : "always-multiline",
                imports  : "never",
                exports  : "only-multiline",
                functions: "never",
            },
        ],
        "@typescript-eslint/type-annotation-spacing": [
            "warn",
            { before: false, after: true },
        ],
        "key-spacing": [
            "warn",
            {
                singleLine: {
                    beforeColon: false,
                    afterColon : true,
                },
                multiLine: {
                    beforeColon: false,
                    afterColon : true,
                    align      : "colon",
                },
            },
        ],
        "sort-imports": [
            "warn",
            {
                ignoreCase           : false,
                ignoreDeclarationSort: true,
                ignoreMemberSort     : false,
                memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
                allowSeparatedGroups : false,
            },
        ],
        "vue/array-bracket-spacing": [
            "warn",
            "always",
            {
                singleValue    : false,
                objectsInArrays: false,
                arraysInArrays : false,
            },
        ],
        "vue/no-multi-spaces": [
            "warn",
            {
                ignoreProperties: false,
            },
        ],
        // override/add rules settings here, such as:
        "vue/script-indent": [
            "off",
            4,
            {
                baseIndent: 0,
                switchCase: 0,
                ignores   : [],
            },
        ],
        "vue/html-self-closing": "off",
        "vue/html-indent"      : [
            "warn",
            4,
            {
                attribute                : 1,
                baseIndent               : 1,
                closeBracket             : 0,
                alignAttributesVertically: true,
                ignores                  : [],
            },
        ],
        "vue/no-unused-vars": [
            "warn",
            {
                ignorePattern: "^_",
            },
        ],
        "vue/no-unused-components": [
            "warn",
            {
                ignoreWhenBindingPresent: true,
            },
        ],
        "vue/multi-word-component-names": "off",
        "vue/object-curly-spacing"      : ["warn", "always"],
        // 标签顺序
        "vue/component-tags-order"      : [
            "warn",
            {
                order: ["script", "template", "style"],
            },
        ],
        // 组件属性顺序
        "vue/order-in-components": [
            "warn",
            {
                order: [
                    "el",
                    "name",
                    "key",
                    "parent",
                    "functional",
                    ["delimiters", "comments"],
                    ["components", "directives", "filters"],
                    "extends",
                    "mixins",
                    ["provide", "inject"],
                    "ROUTER_GUARDS",
                    "layout",
                    "middleware",
                    "validate",
                    "scrollToTop",
                    "transition",
                    "loading",
                    "inheritAttrs",
                    "model",
                    ["props", "propsData"],
                    "emits",
                    "setup",
                    "asyncData",
                    "data",
                    "fetch",
                    "head",
                    "computed",
                    "watch",
                    "watchQuery",
                    "LIFECYCLE_HOOKS",
                    "methods",
                    ["template", "render"],
                    "renderError",
                ],
            },
        ],
        // vue-html组件 属性顺序
        "vue/attributes-order": [
            "warn",
            {
                order: [
                    "DEFINITION",
                    "LIST_RENDERING",
                    "CONDITIONALS",
                    "RENDER_MODIFIERS",
                    "GLOBAL",
                    ["UNIQUE", "SLOT"],
                    "TWO_WAY_BINDING",
                    "OTHER_DIRECTIVES",
                    "OTHER_ATTR",
                    "EVENTS",
                    "CONTENT",
                ],
                // 字母排序
                alphabetical: false,
            },
        ],
        // 定义宏顺序
        "vue/define-macros-order": [
            "warn",
            {
                order: ["defineProps", "defineEmits"],
            },
        ],
        // 组件名称小写
        "vue/component-name-in-template-casing": [
            "warn",
            "kebab-case",
            {
                registeredComponentsOnly: true,
                ignores                 : [],
            },
        ],
    },
    overrides: [
        {
            files: ["*.vue"],
            rules: {
                indent                 : "off",
                "vue/html-self-closing": "off",
            },
        },
    ],
}
