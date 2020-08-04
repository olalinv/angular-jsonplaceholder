export class FormHelper {

  static getErrorMessage = (errorName: string) => {
    let message = '';
    switch (errorName) {
      case 'invalid':
        message = 'El campo no es válido';
        break;
      case 'required':
        message = 'Debes introducir un valor';
        break;
    }
    return message;
  }

}
