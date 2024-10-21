import React from 'react';
import ENV_CONFIG from '../../constant/env.config';
import ProfileWithMenu from '../../shared-resources/components/ProfileWithMenu/ProfileWithMenu';
import { AuthContext } from '../../context/AuthContext';

type Props = {
  leanrerId?: number;
  username?: string;
};

const Header: React.FC<Props> = ({ leanrerId, username }) => (
  <div className='p-4 border-b-[1px] border-black flex justify-between'>
    <div className='flex gap-4 items-center'>
      <img
        src='/assets/logo.svg'
        alt='logo'
        className='h-[68px] w-[68px] rounded-full'
      />
      <p className='font-publicSans text-2xl'>
        AML v{ENV_CONFIG.APP_VERSION ?? '1.0.0'}
      </p>
    </div>

    {leanrerId && (
      <AuthContext.Consumer>
        {({ onLogout }) => (
          <ProfileWithMenu
            learnerId={leanrerId}
            onLogout={onLogout}
            username={username}
          />
        )}
      </AuthContext.Consumer>
    )}
  </div>
);

export default Header;
