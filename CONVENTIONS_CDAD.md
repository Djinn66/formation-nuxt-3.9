# Conventions CDAD-BDX / POI -ALEXO
### Environnement
Les projets sont réalisés en VueJs 3.3+ (composition API / Typescript). Les librairies suivants sont utilisées :

| <img src="https://nuxt.com/assets/design-kit/icon-green.svg" alt="Nuxt" width="40" height="auto">  | **Nuxt** |
| :--------------- |:---------------:| 
|  <img src="https://avatars.githubusercontent.com/u/22138497?s=200&v=4" alt="Vuetify" width="40" height="auto"> |   **Vuetify**  | 
|  <img src="https://pinia.vuejs.org/logo.svg" alt="PiniaImage" width="30" height="auto"> | **Pinia** |

### Structure de base d'un fichier .vue
```html
<script setup lang="ts">
/**  CONFIG  **/

/**  PROPS  **/

/**  EMITS  **/

/**  REFS  **/

/**  COMPUTED  **/

/**  LIFECYCLE  **/

/**  METHODS  **/

</script>
<template>
</template>
<style scoped>
</style>
```
### Structure de dossier
Respecte la structure de dossier de NUXT.

**assets** : Stylesheets (CSS, SASS, etc.) Fonts Images qui ne sont pas dans le dossier `public/`  
**components** : les composants génériques de l'application leurs noms commencent par ***App***. Exemple : `AppNavigationDrawer.vue` **auto-import*  
**composables** : fonctions utilisant vue.js et retournant des éléments réactifs **auto-import*  
**<font color=#0fb503>++ constants</font>** : les constantes de l'application  
**<font color=#0fb503>++ domains</font>** : les composants métier de l'application. Structure de domains :
* `[domain]` exemple : user
    * `FormUser.vue` : les formulaires commencent tous par le mot clé Form
    * `UserDataTable.vue` : les autres composants commencent tous par le nom de la fonctionnalité
    * `user.const.ts` : les constantes de la fonctionnalité
    * `userDatatable.const.ts` : les constantes spécifiques de la fonctionnalité
    * `user.store.ts` le store de la fonctionnalité, return `useUserStore`

**layouts** : les composants parents de l'application présents sur toutes les pages  
**middleware** : fonctions s'exécutant entre deux points de l'application, souvent dans la navigation. Le mot clé "global" dans le nom applique le middleware sur toutes les pages. Exemple :  `auth.global.ts`  
**pages** : les composants routés de l'application enfants de layout  
**plugins** : plugins de l'application. Exemple : `vuetify.ts`  
**public** : images et éléments publics de l'application  
**<font color=#0fb503>++ types</font>** : les types et interfaces de l'application, le nom des fichiers ne contient pas de mot clé et concerne type et interface. Les interfaces exportées finissent par le mot clé Interface.  
Exemple : `user.ts` exporte une interface `UserInterface` et / ou un type `User`.  
**utils**: fonctions de l'application leur nom commence par un verbe.  **auto-import*

### Règles de nommage
Nom des fichiers :

- composant : **PascalCase**
- les composants routés : **kebab-case**
- .ts : **camelCase**

Dans les fichiers :

- dans le template les composants sont en PascalCase. Exemple : `<VList>`
- constantes : **MAJUSCULE_UNDERSCORE**
- fonctions : commence par un verbe => isFunction(**param,  options:{ }**)
- variables booléennes : ne commence pas par un verbe => userConnected = true

### Typage manuel
L'utilisation de *TypeScript* consiste à naviguer entre le typage automatique et le typage manuel. Lorsque la variable est de type Objet par exemple, il faudra créer une interface ou un type qui définira l'Objet.


#### Props
```html  
<script setup lang="ts">  
 import User from "~//types"  
 
 /** PROPS **/
 interface Props {  
    count: number | string  
    users: Array<User>  
    selected?: User  
 }  
 const props = defineProps<Props>()  
</script>  
```  

#### Refs
```html  
<script setup lang="ts">  
 import User from "~//types"; 
 
 /**  REFS **/
 const user = ref<User|null>(null);  
</script>  
```  

#### Computed
```html  
<script setup lang="ts">  
 
 /** COMPUTED **/ 
 const double = computed<number>(() => {    
       // Erreur TypeScript si le return n'est pas de type number    
 })  
</script>  
```  

#### Emits
```html  
<script setup lang="ts">  
  
  /** EMITS **/
  type Emits = {
    'update:modelValue':[value:'dark'|'light']
  }
  const emit = defineEmits<Emits>()
</script>  
```  

#### Les Fonctions
```ts  
<script setup lang="ts">   
  
  /**  METHODS  **/
 /** fonctions liées aux événements */ 
 function handleChange(event:  Event) {    
    console.log((event.target as  HTMLInputElement).value)    
 }  
  
 const handleClick = (event: MouseEvent) => {  
    console.log((event.target as  HTMLInputElement).value)  
 }  
  
 /** fonction avec type générique et valeur de retour */ 
 const deleteItem = <GenericType extends {id: number}>(item: GenericType): <'success'|'error'> => {  
    // logique de suppression d'un item 
    // doit retourner "success" ou "error"
    return 'success'
  }  
</script>  
```  
