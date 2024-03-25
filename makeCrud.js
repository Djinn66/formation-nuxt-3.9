import {existsSync, mkdirSync, writeFileSync, readFileSync} from 'fs'
import {join} from 'path'
import {createInterface} from 'readline'
import path from 'path'
import {fileURLToPath} from 'url'
import pluralize from 'pluralize'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
function makeCrud(entityName) {
  const lowerCaseEntityName = entityName.toLowerCase()
  const capitalizedEntityName =
    lowerCaseEntityName.charAt(0).toUpperCase() + lowerCaseEntityName.slice(1)

  const singularEntityName = pluralize.singular(entityName)
  const pluralEntityName = pluralize.plural(entityName)

  const lowerCaseSingularEntityName = singularEntityName.toLowerCase()
  const lowerCasePluralEntityName = pluralEntityName.toLowerCase()

  const capitalizedSingularEntityName =
    lowerCaseSingularEntityName.charAt(0).toUpperCase() +
    lowerCaseSingularEntityName.slice(1)
  const capitalizedPluralEntityName =
    lowerCaseSingularEntityName.charAt(0).toUpperCase() +
    lowerCaseSingularEntityName.slice(1)

  const formName = `Form${capitalizedSingularEntityName}`

  const entityDirectory = join(__dirname, 'domains', lowerCaseEntityName)
  const typeDirectory = join(__dirname, 'types')

  // Créer le dossier de l'entité s'il n'existe pas déjà
  if (!existsSync(entityDirectory)) {
    console.log(`Creating ${entityDirectory}...`)
    mkdirSync(entityDirectory)
  }

  if (!existsSync(typeDirectory)) {
    console.log(`Creating ${typeDirectory}...`)
    mkdirSync(typeDirectory)
  }

  // Générer les fichiers de l'entité (vous pouvez ajouter d'autres fichiers si nécessaire)
  const entityFiles = [
    {
      fileName: 'dataTableTemplates.const.ts',
      content:
        "import type {DataTableTemplate} from '~//types/dataTableTemplate'\n" +
        '\n' +
        'export const dataTableTemplatesConst: Array<DataTableTemplate> = [\n' +
        '  /**\n' +
        `   * Colones à modifier dans le datatable des ${lowerCasePluralEntityName}\n` +
        "   *  key: string => paramètre de l'entité présent dans la colonne\n" +
        "   *  component: Component => composant remplacant l'affichage de la value\n" +
        '   *  props?: object => props à passer au composant\n' +
        '   *  target?: string => props du composant recevant la value\n' +
        '   *  handlers?: object => emits à passer au composant\n' +
        '   **/\n' +
        ']',
    },
    {
      fileName: 'defaultValue.const.ts',
      content:
        'export const defaultValueConst = {\n' +
        '  /**\n' +
        "   * valeur par défaut de l'entité.\n" +
        "   * Ajoutez d'autres valeurs si besoin.\n" +
        '   **/\n' +
        "} //satisfies Omit< \"Ajouter ici L'interface\", 'id'>",
    },
    {
      fileName: `${formName}.vue`,
      content:
        '<script setup lang="ts">\n' +
        `import type {${capitalizedSingularEntityName}Interface} from '~//types/${lowerCaseSingularEntityName}'\n` +
        "  import {FORM_VALIDATIONS_RULES} from '~//constants/formValidationsRules.const'\n" +
        '\n' +
        '  /** PROPS **/\n' +
        '  interface Props {\n' +
        '    modelValue: unknown\n' +
        '  }\n' +
        '\n' +
        '  const props = defineProps<Props>()\n' +
        '\n' +
        '  /** EMITS **/\n' +
        '  type Emits = {\n' +
        "    'update:modelValue': [\n" +
        `     value: ${capitalizedSingularEntityName}Interface | Omit<${capitalizedSingularEntityName}Interface, 'id'>,\n` +
        '    ]\n' +
        '  }\n' +
        '  const emit = defineEmits<Emits>()\n' +
        '\n' +
        '  /** COMPUTED **/\n' +
        `const ${lowerCaseSingularEntityName} = computed({\n` +
        '    get: () =>\n' +
        `     props.modelValue as ${capitalizedSingularEntityName}Interface | Omit<${capitalizedSingularEntityName}Interface, 'id'>,\n` +
        "    set: (value) => emit('update:modelValue', value),\n" +
        '  })\n' +
        '</script>\n' +
        '\n' +
        '<template>\n' +
        '  <v-text-field\n' +
        `    v-model="${lowerCaseSingularEntityName}.exemple"\n` +
        '    label="Exemple"\n' +
        '    :rules="[FORM_VALIDATIONS_RULES.required]"\n' +
        '  />\n' +
        '</template>\n' +
        '\n' +
        '<style scoped></style>\n',
    },
    {
      fileName: 'tableHeaders.const.ts',
      content:
        "import type {ReadonlyHeaders} from '~//types/headers'\n" +
        '\n' +
        'export const tableHeadersConst = [\n' +
        "  {title: 'Photo', align: 'start', sortable: false, key: 'thumbnail'},\n" +
        "  {title: 'Title', align: 'start', sortable: true, key: 'title'},\n" +
        "  {title: 'Prix', align: 'start', sortable: true, key: 'price'},\n" +
        "  {title: 'Catégorie', align: 'start', sortable: true, key: 'category'},\n" +
        "  {title: 'Actions', key: 'actions', sortable: false},\n" +
        '] satisfies ReadonlyHeaders',
    },
    {
      fileName: 'titles.const.ts',
      content:
        'export const titles = {\n' +
        `  formTitle: '${capitalizedSingularEntityName}',\n` +
        `tableTitle: 'Gestion des ${lowerCasePluralEntityName}',\n` +
        '}',
    },
    {
      fileName: 'index.ts',
      content:
        `import ${formName} from '~//domains/${lowerCaseEntityName}/${formName}.vue'\n` +
        `const FormComponent = ${formName}\n` +
        `export {defaultValueConst} from '~//domains/${lowerCaseEntityName}/defaultValue.const'\n` +
        `export {tableHeadersConst} from '~//domains/${lowerCaseEntityName}/tableHeaders.const'\n` +
        `export {titles} from '~//domains/${lowerCaseEntityName}/titles.const'\n` +
        `export {dataTableTemplatesConst} from '~//domains/${lowerCaseEntityName}/dataTableTemplates.const'\n` +
        'export {FormComponent}',
    },

    // Ajoutez d'autres fichiers d'entité si nécessaire
  ]

  const typeFile = {
    fileName: `${lowerCaseSingularEntityName}.ts`,
    content:
      "import type {EntityInterface} from '~//types/entity'\n" +
      '\n' +
      `export interface ${capitalizedSingularEntityName}Interface extends EntityInterface {\n` +
      '  exemple: string\n' +
      '}',
  }

  entityFiles.forEach((file) => {
    const filePath = join(entityDirectory, file.fileName)
    writeFileSync(filePath, file.content)
    console.log(`Created ${filePath}`)
  })

  const typeFilePath = join(typeDirectory, typeFile.fileName)
  writeFileSync(typeFilePath, typeFile.content)
  console.log(`Created ${typeFilePath}`)

  updateDomains(lowerCaseEntityName)
}

// Fonction pour demander le nom de l'entité à l'utilisateur
function askForEntityName() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise((resolve) => {
    rl.question('Enter the name of the entity: ', (entityName) => {
      rl.close()
      resolve(entityName.trim())
    })
  })
}

// Fonction pour mettre à jour l'objet domains dans le fichier index.js
const updateDomains = (entityName) => {
  const filePath = path.join(__dirname, 'domains', 'index.ts')
  let content = readFileSync(filePath, 'utf8')

  const newImports = content
    .split('\n')
    .filter((line) => line.includes('import'))
  newImports.push(`import * as ${entityName} from './${entityName}'`)

  const newDomains = content
    .slice(content.indexOf('{') + 2, content.lastIndexOf('}') - 1)
    .split('\n')
  newDomains.push(`  ${entityName},`)

  const newContent = `${newImports.join('\n')}\n\nexport const domains = {\n${newDomains.join('\n')}\n}\n`
  writeFileSync(filePath, newContent)
  console.log(`Updated ${filePath}`)
}

// Utilisation du script
async function main() {
  let entityName = process.argv[2]

  if (!entityName) {
    entityName = await askForEntityName()
  }

  if (!entityName) {
    console.error('Please provide the name of the entity.')
    process.exit(1)
  }

  makeCrud(entityName)
}

await main()
