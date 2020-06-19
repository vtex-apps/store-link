const findGroupAndSpecification = (path: string) => {
  const regex = /\{specificationGroups\.(.+)\.specifications\.(.+)\}/g
  const regexResult = regex.exec(path)
  if (!regexResult) return null
  const [, groupName, specificationName] = regexResult
  return {
    groupName,
    specificationName,
  }
}

export default (specificationGroups: any[], link: string) => {
  const result = findGroupAndSpecification(link)

  if (!result) return null

  const { groupName, specificationName } = result

  const specificationTarget = specificationGroups
    ?.find((specificationGroup: any) => specificationGroup.name === groupName)
    ?.specifications?.find(
      (specification: any) => specification.name === specificationName
    )

  const specificationValue = specificationTarget
    ? specificationTarget.values[0]
    : null
  const key = `specificationGroups.${groupName}.specifications.${specificationName}`
  return specificationValue ? { [key]: specificationValue } : null
}
