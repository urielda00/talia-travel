const requiredEnvironmentVariables = [
  'VITE_SANITY_PROJECT_ID',
  'VITE_SANITY_DATASET',
  'VITE_SANITY_API_VERSION',
] as const

type EnvironmentVariable = (typeof requiredEnvironmentVariables)[number]

function getRequiredEnvironmentVariable(name: EnvironmentVariable): string {
  const value = import.meta.env[name]

  if (!value) {
    const guidance = import.meta.env.DEV
      ? ` Copy web/.env.example to web/.env.local and set ${name}.`
      : ''

    throw new Error(`Missing required environment variable: ${name}.${guidance}`)
  }

  return value
}

export const sanityEnvironment = {
  projectId: getRequiredEnvironmentVariable('VITE_SANITY_PROJECT_ID'),
  dataset: getRequiredEnvironmentVariable('VITE_SANITY_DATASET'),
  apiVersion: getRequiredEnvironmentVariable('VITE_SANITY_API_VERSION'),
}
