/**
 * Since the ecosystem hasn't fully migrated to ESLint's new FlatConfig system yet,
 * we "need" to type some of the plugins manually :(
 */

declare module 'eslint-plugin-check-file' {
  import type {Linter, Rule} from 'eslint'

  export const configs: {
    recommended: {rules: Linter.RulesRecord}
  }
  export const rules: Record<string, Rule.RuleModule>
}
