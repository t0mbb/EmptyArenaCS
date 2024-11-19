import React, { cloneElement }  from 'react'

export enum RoleName {
  ADMIN = '$2a$12$OgjIqSg/4vTRczCIjTNXuuA1gewxE/JdRYnsBe4avjzK3ARFtrA6m',
  STAFF = '$2a$12$yYDaOIhmmY6BgKXx6sxJAOShiLrA/8C41MjlLEu4FQxDZ9kqRa9Nu',
  GUEST = 'guest',
}

const RoleProtected = (props: { allowedRole: RoleName[], children: React.ReactElement }) => {
    const user = JSON.parse(sessionStorage.getItem('userData') || '{}');
    console.log(user);
    if (!user.role) return null;
    if (!props.allowedRole.includes(user.role)) {
        return null;
    }

    return cloneElement(props.children, props);
}
export default RoleProtected