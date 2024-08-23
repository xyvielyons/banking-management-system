import React from 'react'
import HeaderBox from '@/components/shared/HeaderBox'
import TotalBalanceBox from '@/components/shared/TotalBalanceBox'
import RightSidebar from '@/components/shared/RightSidebar'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import { getAccount, getAccounts } from '@/lib/actions/bank.actions'
const Home = async({searchParams:{id,page}}:SearchParamProps) => {
  const loggedIn = await getLoggedInUser()
  const accounts = await getAccounts({userId:loggedIn.$id})

  if(!accounts) return;
  const accountsData = accounts?.data
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({appwriteItemId})
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
        accounts={accountsData}
        totalBanks={accounts?.totalBanks}
        totalCurrentBalance={accounts?.totalCurrentBalance}
        />
      </div>

      <RightSidebar
      user={loggedIn}
      transactions={accounts?.transactions}
      banks={accountsData?.slice(0,2)}
      />
    </section>
  )
}

export default Home