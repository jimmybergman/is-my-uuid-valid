declare interface Options {
  version?: 1 | 2 | 3 | 4 | 5
  letterCase?: 'lower' | 'upper'
}

declare function validator(opts: Options): (input: string) => boolean

export = validator
