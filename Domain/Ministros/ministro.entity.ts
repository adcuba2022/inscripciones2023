import { v4 as uuidv4 } from 'uuid';

export class Ministros {
    readonly id?: string;
    readonly nombre?: string;
    readonly ci?: string;
    readonly genero?: string;
    readonly email?: string;
    readonly celular?: string;
    readonly categoria?:string;
    readonly funciones?: string;
    readonly distrito?: string;
    readonly provincia?:string;
    readonly presbiterio?: string;
    readonly iglesia?: string;
    readonly matrimonio?: boolean;
    readonly hospedaje?: boolean;
    readonly ci_conyugue?: string;


    constructor(
      id: string,
      nombre: string,
      ci: string,
      genero: string,
      email: string,
      celular: string,
      categoria:string,
      funciones: string,
      distrito: string,
      provincia:string,
      presbiterio: string,
      iglesia: string,
      matrimonio: boolean,
      hospedaje: boolean,
      ci_conyugue: string,
    ) {
      this.id = id;
      this.nombre = nombre;
      this.ci = ci;
      this.genero = genero;
      this.email = email;
      this.celular = celular;
      this.categoria = categoria;
      this.funciones = funciones;
      this.distrito = distrito;
      this.provincia = provincia;
      this.presbiterio = presbiterio;
      this.iglesia = iglesia;
      this.matrimonio = matrimonio;
      this.hospedaje = hospedaje;
      this.ci_conyugue = ci_conyugue;
    }

    static Create(
        nombre: string,
        ci: string,
        genero: string,
        email: string,
        celular: string,
        categoria:string,
        funciones: string,
        distrito: string,
        provincia:string,
        presbiterio: string,
        iglesia: string,
        matrimonio: boolean,
        hospedaje: boolean,
        ci_conyugue: string,
        ): Ministros
    {
      const ministro = new Ministros(
        uuidv4(),
        nombre,
        ci,
        genero,
        email,
        celular,
        categoria,
        funciones,
        distrito,
        provincia,
        presbiterio,
        iglesia,
        matrimonio,
        hospedaje,
        ci_conyugue
      );
      return ministro;
    }
}
