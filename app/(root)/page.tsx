import React from 'react'
import HeaderBox from '@/components/shared/HeaderBox'
import TotalBalanceBox from '@/components/shared/TotalBalanceBox'
import RightSidebar from '@/components/shared/RightSidebar'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import { useRouter } from 'next/router'
const Home = async() => {
  const loggedIn = await getLoggedInUser()
  return (
    <section className='home'>
      <div className="home-content">

        <header className='home-header'>
          <HeaderBox
          type="greeting"
          title="welcome"
          user={loggedIn?.name || 'Guest'}
          subtext="Access and manage your account and transactions efficiently"
          />
        </header>

        <TotalBalanceBox
        accounts={[]}
        totalBanks={1}
        totalCurrentBalance={1250.35}
        />
      </div>

      <RightSidebar
      user={loggedIn}
      transactions={[]}
      banks={[{currentBalance:123.50},{currentBalance:500.50}]}
      />
    </section>
  )
}

export default Home