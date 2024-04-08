import React from 'react'

export enum RoleName {
  ADMIN = 'admin',
  STAFF = 'staff',
  GUEST = 'guest',
}

const RoleProtected = (props: { allowedRole: RoleName[], children: React.ReactElement }) => {
    const user = JSON.parse(sessionStorage.getItem('userData') || '{}');
    console.log(user);
    if (!user.role) return null;
    if (!props.allowedRole.includes(user.role)) {
        return null;
    }

  return props.children;
}

export default RoleProtected