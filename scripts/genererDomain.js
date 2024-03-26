import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'fs'
import path, {join} from 'path'
import {createInterface} from 'readline'
import pluralize from 'pluralize'

const MAIN_FOLDER = '../src'

await main()

async function main() {
  // == Etape 1 : Demander le nom de l'entité == /
  const entityName = await demanderInput({
    question: "Saisir le nom de l'entité à générer :",
    erreur: 'Veuillez saisir une entité !',
  })

  // == Etape 2 : Préparer les noms de fichiers et de dossiers == //
  const nomsFichiers = preparerNomsFichiers(entityName)

  // == Etape 3 : creer les dossiers == //
  creerDossier('domains', nomsFichiers.lowerCase)
  creerDossier('types')

  // == Etape 4 : Générer les fichiers == //
  genererDomainsFiles(nomsFichiers).forEach((file) => {
    creerFichier(`domains/${nomsFichiers.lowerCase}`, file)
  })

  genererTypesFiles(nomsFichiers).forEach((file) => {
    creerFichier(`types`, file)
  })

  // == Etape 5 : Mettre à jour le fichier domains/index.js == //
  updateIndexDomains(entityName)
}

async function demanderInput({question, erreur}) {
  // Création d'un input en console pour demander le nom de l'entité
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  // Renvoie de l'input de l'utilisateur
  const entityName = new Promise((resolve) => {
    rl.question(question ?? 'Saisir une valeur', (entityName) => {
      rl.close()
      resolve(entityName.trim())
    })
  })

  await Promise.resolve(entityName)

  if (!entityName) {
    console.error(erreur ?? 'Veuillez saisir une valeur')
    process.exit(1)
  }

  return entityName
}

export function preparerNomsFichiers(entityName) {
  // == Mise en forme de l'entité au format PascalCase == //

  const lowerCase = pluralize.singular(entityName).toLowerCase()

  const capitalizedName = lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1)

  // == Nom du formulaire de l'entité == //

  const formName = `Form${capitalizedName}`

  return {
    form: formName,
    lowerCase: lowerCase,
    capitalized: capitalizedName,
  }
}

export function creerDossier(path, name) {
  const entityDirectory = join(MAIN_FOLDER, path, name ?? '')
  if (!existsSync(entityDirectory)) {
    console.log(`Creating ${entityDirectory}...`)
    mkdirSync(entityDirectory)
  }
}

function genererDomainsFiles({form, lowerCase, capitalized}) {
  return [
    {
      fileName: 'dataTableTemplates.const.ts',
      content:
        "import type {DataTableTemplate} from '~//types/dataTableTemplate'\n" +
        '\n' +
        'export const dataTableTemplatesConst: Array<DataTableTemplate> = [\n' +
        '  /**\n' +
        `   * Colones à modifier dans le datatable des ${lowerCase}\n` +
        "   *  key: string => paramètre de l'entité présent dans la colonne\n" +
        "   *  component: Component → composant remplacant l'affichage de la value\n" +
        '   *  props?: object → props à passer au composant\n' +
        '   *  target?: string → props du composant recevant la value\n' +
        '   *  handlers?: object → emits à passer au composant\n' +
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
      fileName: `${form}.vue`,
      content:
        '<script setup lang="ts">\n' +
        `import type {${capitalized}Interface} from '~//types/${capitalized}'\n` +
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
        `     value: ${capitalized}Interface | Omit<${capitalized}Interface, 'id'>,\n` +
        '    ]\n' +
        '  }\n' +
        '  const emit = defineEmits<Emits>()\n' +
        '\n' +
        '  /** COMPUTED **/\n' +
        `const ${lowerCase} = computed({\n` +
        '    get: () =>\n' +
        `     props.modelValue as ${lowerCase}Interface | Omit<${lowerCase}Interface, 'id'>,\n` +
        "    set: (value) => emit('update:modelValue', value),\n" +
        '  })\n' +
        '</script>\n' +
        '\n' +
        '<template>\n' +
        '  <v-text-field\n' +
        `    v-model="${lowerCase}.exemple"\n` +
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
        `  formTitle: '${capitalized}',\n` +
        `tableTitle: 'Gestion des ${pluralize.plural(capitalized)}',\n` +
        '}',
    },
    {
      fileName: 'index.ts',
      content:
        `import ${form} from '~//domains/${lowerCase}/${form}.vue'\n` +
        `const FormComponent = ${form}\n` +
        `export {defaultValueConst} from '~//domains/${lowerCase}/defaultValue.const'\n` +
        `export {tableHeadersConst} from '~//domains/${lowerCase}/tableHeaders.const'\n` +
        `export {titles} from '~//domains/${lowerCase}/titles.const'\n` +
        `export {dataTableTemplatesConst} from '~//domains/${lowerCase}/dataTableTemplates.const'\n` +
        'export {FormComponent}',
    },
  ]
}

function genererTypesFiles({lowerCase, capitalized}) {
  return [
    {
      fileName: `${lowerCase}.ts`,
      content:
        "import type {EntityInterface} from '~//types/entity'\n" +
        '\n' +
        `export interface ${capitalized}Interface extends EntityInterface {\n` +
        '  exemple: string\n' +
        '}',
    },
  ]
}

export function creerFichier(path, {content, fileName}) {
  const filePath = join(MAIN_FOLDER, path, fileName)
  writeFileSync(filePath, content)
  console.log(`Created ${filePath}`)
}

export function updateIndexDomains(entityName) {
  const filePath = path.join(MAIN_FOLDER, 'domains', 'index.ts')
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
