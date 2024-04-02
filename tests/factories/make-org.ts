interface MakeOrgParams {
  id?: string
  org_name?: string
  owner_name?: string
  email?: string
  cep?: string
  city?: string
  phone?: string
  password_hash?: string
}

export function makeOrg(params?: MakeOrgParams) {
  return {
    id: params?.id ?? 'org-id-1',
    org_name: params?.org_name ?? 'Org Name',
    owner_name: params?.owner_name ?? 'Owner Name',
    email: params?.email ?? 'test@email.com',
    cep: params?.cep ?? '12345678',
    city: params?.city ?? 'Cidade dos Gatos',
    phone: params?.phone ?? '12345678',
    password_hash: params?.password_hash ?? 'password',
  }
}
