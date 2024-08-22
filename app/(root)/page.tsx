import React from 'react'
import HeaderBox from '@/components/shared/HeaderBox'
import TotalBalanceBox from '@/components/shared/TotalBalanceBox'
const Home = () => {
  const loggedIn = {firstName:'Xyvie'}
  return (
    <section className='home'>
      <div className="home-content">

        <header className='home-header'>
          <HeaderBox
          type="greeting"
          title="welcome"
          user={loggedIn?.firstName || 'Guest'}
          subtext="Access and manage your account and transactions efficiently"
          />
        </header>

        <TotalBalanceBox
        accounts={[]}
        totalBanks={1}
        totalCurrentBalance={1250.35}
        />
      </div>
    </section>
  )
}

export default Home