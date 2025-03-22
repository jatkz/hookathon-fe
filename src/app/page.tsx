"use client";
// import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import {
  useAuthModal,
  useLogout,
  useSignerStatus,
  useUser,
  useSmartAccountClient,
  useSendUserOperation
} from "@account-kit/react";
import MarketCard from '@/components/MarketCard';


export default function Home() {
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();
  const { client, address, isLoadingClient } = useSmartAccountClient({});

  const { sendUserOperation, isSendingUserOperation } = useSendUserOperation({
    client,
    // optional parameter that will wait for the transaction to be mined before returning
    waitForTxn: true,
    onSuccess: ({ hash, request }) => {
      // [optional] Do something with the hash and request
    },
    onError: (error) => {
      // [optional] Do something with the error
    },
  });
  
  return (
    <div className="app-container">
      {/* <Head>
        <title>Prediction Market Platform</title>
        <meta name="description" content="A prediction market platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}

      <nav className="header">
        <div className="header-content">
          <div className="logo-container">
            <Link href="/" className="logo-link">
              <svg className="logo" width="168" height="38" viewBox="0 0 168 38" fill="none">
                {/* Logo path data would go here */}
                <path d="..." fill="black"></path>
              </svg>
            </Link>
          </div>
          
          <div className="search-container">
            <form action="search" className="search-form">
              <input id="search-input" placeholder="Search markets" type="search" className="search-input" />
              <div className="search-icon-container">
                <svg className="search-icon" viewBox="0 0 20 20" height="1em" width="1em">
                  <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path>
                </svg>
              </div>
            </form>
          </div>
          
          <div className="nav-container">
            <nav className="main-nav">
              <ul className="nav-list">
                <li className="nav-item">
                  <Link href="/markets" className="nav-link">
                    <span className="nav-icon">{/* Icon */}</span>
                    <span className="nav-text">Markets</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/dashboards" className="nav-link">
                    <span className="nav-icon">{/* Icon */}</span>
                    <span className="nav-text">Dashboards</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/activity" className="nav-link">
                    <span className="nav-icon">{/* Icon */}</span>
                    <span className="nav-text">Activity</span>
                  </Link>
                </li>
              </ul>
            </nav>
            
            <div className="auth-buttons">
              {signerStatus.isInitializing ? (
                <div className="loading-container">
                  <div className="spinner"></div>
                  <p className="loading-text">Loading your account...</p>
                </div>
              ) : user ? (
                <div className="login-container">
                  <button 
                    className="logout-button"
                    onClick={() => logout()}
                  >
                    Log out
                  </button>
                </div>
              ) : (
                <div className="login-container">
                  <button 
                    className="login-button"
                    onClick={openAuthModal}
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="category-nav">
          <div className="live-indicator">
            <span className="live-text">LIVE</span>
            <div className="pulse-dot"></div>
          </div>
          <ul className="category-list">
            <li className="category-item">
              <Link href="/markets/all" className="category-link">
                All
              </Link>
            </li>
            <li className="category-item">
              <Link href="/markets/new" className="category-link">
                New
              </Link>
            </li>
            <li className="category-item">
              <Link href="/markets/politics" className="category-link">
                Politics
              </Link>
            </li>
            <li className="category-item">
              <Link href="/sports/live" className="category-link">
                Sports
              </Link>
            </li>
            <li className="category-item">
              <Link href="/markets/crypto" className="category-link">
                Crypto
              </Link>
            </li>
            {/* More categories */}
          </ul>
        </div>
      </nav>

      <main className="main-content">
        <div className="markets-container">
          <MarketCard title={'Market Title Goes Here'} url={''}></MarketCard>
          <MarketCard title={'Eth price > 2000 on Mar 25th'} url={''}></MarketCard>
          <MarketCard title={'Jesus rises in 2025'} url={''}></MarketCard>
          <MarketCard title={'We all retire'} url={''}></MarketCard>
          <MarketCard title={'Trump in jail'} url={''}></MarketCard>
          <MarketCard title={'Trump takes Kim jung un to New York Yankess in 2025'} url={''}></MarketCard>
        </div>
      </main>
    </div>
  );
}
