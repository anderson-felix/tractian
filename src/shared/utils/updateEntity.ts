/**
 * This function updates the entity based on request body
 * @param entity Entity to be updated
 * @param params Received params in request body
 * @returns void
 */

export const updateEntity = <T>(entity: T, params: Partial<T>): void =>
  Object.keys(params)?.forEach(key => {
    if (
      ((entity as any)[key] || (entity as any)[key] === null) &&
      (params as any)[key]
    )
      (entity as any)[key] = (params as any)[key];
  });
