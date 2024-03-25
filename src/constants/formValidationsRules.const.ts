/**
 * Liste des règles de validation du formulaire
 */
export const FORM_VALIDATIONS_RULES = {
  required: (v: string) => !!v || 'Ce champ est requis !',
  notEmpty: (v: Array<unknown>) =>
    v.length > 0 || 'Ce champ ne doit pas être vide !',

  passwordValid: (v: string) => {
    if (v === undefined) {
      return true
    }
    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,30}$/
    return (
      pattern.test(v) ||
      'Le mot de passe doit contenir au moins 12 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.'
    )
  },
  email: (v: string) => {
    const pattern = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/
    return pattern.test(v) || 'Adresse mail invalide !'
  },
  nbCaraMax: (v: string, nb: number) => {
    return (
      v === null ||
      v.length <= nb ||
      `Le champ doit avoir moins de ${nb} caractères`
    )
  },
  onlyNumber: (v: string) => {
    return (
      v === null ||
      v === '' ||
      /^\d+$/.test(v) ||
      'Ce champ ne doit contenir que des chiffres'
    )
  },
}
