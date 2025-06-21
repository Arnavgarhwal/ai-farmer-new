import React, { useState, useEffect } from 'react';
import API_ENDPOINTS from './config';

interface VisitorStats {
  today: number;
  thisWeek: number;
  thisMonth: number;
  thisYear: number;
  total: number;
}

interface DashboardData {
  total_users: number;
  total_schemes: number;
  total_crops: number;
  recent_activities: Array<{
    action: string;
    time: string;
  }>;
  system_stats: {
    uptime: string;
    version: string;
    last_backup: string;
  };
}

const AdminDashboard: React.FC = () => {
  const [visitorStats, setVisitorStats] = useState<VisitorStats>({
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
    thisYear: 0,
    total: 0
  });
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const loadDashboardData = async () => {
    try {
      // Fetch dashboard data from backend
      const response = await fetch(API_ENDPOINTS.ADMIN_DASHBOARD);
      if (response.ok) {
        const data = await response.json();
        setDashboardData(data);
        
        // Use real visitor stats from backend
        if (data.visitor_stats) {
          setVisitorStats(data.visitor_stats);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load dashboard data and visitor stats
    loadDashboardData();
  }, []);

  const handleLogout = () => {
    // Clear any stored tokens/session
    localStorage.removeItem('adminToken');
    window.location.reload();
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: '#fff',
          padding: '40px',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #e0f2fe',
            borderTop: '4px solid #16a34a',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p style={{ color: '#6B7280', fontSize: '16px' }}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      {/* Header */}
      <header style={{
        background: '#fff',
        borderBottom: '1px solid #e2e8f0',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img src="/logo.png" alt="Intellifarm Systems Logo" style={{ height: '40px' }} />
          <h1 style={{
            color: '#16a34a',
            fontWeight: '700',
            fontSize: '24px',
            margin: '0'
          }}>
            Admin Dashboard
          </h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => {
              setLoading(true);
              loadDashboardData();
            }}
            style={{
              background: '#16a34a',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>🔄</span>
            Refresh
          </button>
          <button
            onClick={handleLogout}
            style={{
              background: '#ef4444',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '32px',
          background: '#fff',
          padding: '8px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          {['overview', 'visitors', 'analytics', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: activeTab === tab ? '#16a34a' : 'transparent',
                color: activeTab === tab ? '#fff' : '#6B7280',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textTransform: 'capitalize'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Content */}
        {activeTab === 'overview' && (
          <div>
            {/* Visitor Statistics Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px',
              marginBottom: '32px'
            }}>
              <div style={{
                background: '#fff',
                padding: '24px',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ color: '#6B7280', fontSize: '14px', margin: '0 0 8px 0' }}>Today's Visitors</p>
                    <h3 style={{ color: '#16a34a', fontSize: '32px', fontWeight: '700', margin: '0' }}>
                      {visitorStats.today.toLocaleString()}
                    </h3>
                  </div>
                  <div style={{
                    background: '#dcfce7',
                    padding: '12px',
                    borderRadius: '12px'
                  }}>
                    <span style={{ fontSize: '24px' }}>👥</span>
                  </div>
                </div>
              </div>

              <div style={{
                background: '#fff',
                padding: '24px',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ color: '#6B7280', fontSize: '14px', margin: '0 0 8px 0' }}>This Week</p>
                    <h3 style={{ color: '#16a34a', fontSize: '32px', fontWeight: '700', margin: '0' }}>
                      {visitorStats.thisWeek.toLocaleString()}
                    </h3>
                  </div>
                  <div style={{
                    background: '#dbeafe',
                    padding: '12px',
                    borderRadius: '12px'
                  }}>
                    <span style={{ fontSize: '24px' }}>📅</span>
                  </div>
                </div>
              </div>

              <div style={{
                background: '#fff',
                padding: '24px',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ color: '#6B7280', fontSize: '14px', margin: '0 0 8px 0' }}>This Month</p>
                    <h3 style={{ color: '#16a34a', fontSize: '32px', fontWeight: '700', margin: '0' }}>
                      {visitorStats.thisMonth.toLocaleString()}
                    </h3>
                  </div>
                  <div style={{
                    background: '#fef3c7',
                    padding: '12px',
                    borderRadius: '12px'
                  }}>
                    <span style={{ fontSize: '24px' }}>📊</span>
                  </div>
                </div>
              </div>

              <div style={{
                background: '#fff',
                padding: '24px',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ color: '#6B7280', fontSize: '14px', margin: '0 0 8px 0' }}>This Year</p>
                    <h3 style={{ color: '#16a34a', fontSize: '32px', fontWeight: '700', margin: '0' }}>
                      {visitorStats.thisYear.toLocaleString()}
                    </h3>
                  </div>
                  <div style={{
                    background: '#fce7f3',
                    padding: '12px',
                    borderRadius: '12px'
                  }}>
                    <span style={{ fontSize: '24px' }}>🎯</span>
                  </div>
                </div>
              </div>
            </div>

            {/* System Overview */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: '24px'
            }}>
              <div style={{
                background: '#fff',
                padding: '24px',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                border: '1px solid #e2e8f0'
              }}>
                <h3 style={{
                  color: '#16a34a',
                  fontSize: '20px',
                  fontWeight: '700',
                  margin: '0 0 20px 0'
                }}>
                  Recent Activities
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {dashboardData?.recent_activities.map((activity, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      background: '#f8fafc',
                      borderRadius: '8px'
                    }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        background: '#16a34a',
                        borderRadius: '50%'
                      }}></div>
                      <span style={{ color: '#374151', fontSize: '14px' }}>{activity.action}</span>
                      <span style={{ color: '#6B7280', fontSize: '12px', marginLeft: 'auto' }}>
                        {new Date(activity.time).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{
                background: '#fff',
                padding: '24px',
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                border: '1px solid #e2e8f0'
              }}>
                <h3 style={{
                  color: '#16a34a',
                  fontSize: '20px',
                  fontWeight: '700',
                  margin: '0 0 20px 0'
                }}>
                  System Stats
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <p style={{ color: '#6B7280', fontSize: '12px', margin: '0 0 4px 0' }}>Total Users</p>
                    <p style={{ color: '#374151', fontSize: '18px', fontWeight: '600', margin: '0' }}>
                      {dashboardData?.total_users || 0}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: '#6B7280', fontSize: '12px', margin: '0 0 4px 0' }}>Total Schemes</p>
                    <p style={{ color: '#374151', fontSize: '18px', fontWeight: '600', margin: '0' }}>
                      {dashboardData?.total_schemes || 0}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: '#6B7280', fontSize: '12px', margin: '0 0 4px 0' }}>Total Crops</p>
                    <p style={{ color: '#374151', fontSize: '18px', fontWeight: '600', margin: '0' }}>
                      {dashboardData?.total_crops || 0}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: '#6B7280', fontSize: '12px', margin: '0 0 4px 0' }}>System Uptime</p>
                    <p style={{ color: '#374151', fontSize: '18px', fontWeight: '600', margin: '0' }}>
                      {dashboardData?.system_stats.uptime || '24 hours'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'visitors' && (
          <div style={{
            background: '#fff',
            padding: '24px',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{
              color: '#16a34a',
              fontSize: '24px',
              fontWeight: '700',
              margin: '0 0 24px 0'
            }}>
              Visitor Analytics
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px'
            }}>
              <div style={{
                background: '#f8fafc',
                padding: '20px',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <h4 style={{ color: '#16a34a', fontSize: '28px', fontWeight: '700', margin: '0 0 8px 0' }}>
                  {visitorStats.total.toLocaleString()}
                </h4>
                <p style={{ color: '#6B7280', fontSize: '14px', margin: '0' }}>Total Visitors</p>
              </div>
              <div style={{
                background: '#f8fafc',
                padding: '20px',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <h4 style={{ color: '#16a34a', fontSize: '28px', fontWeight: '700', margin: '0 0 8px 0' }}>
                  {Math.round(visitorStats.today / 24)}/hr
                </h4>
                <p style={{ color: '#6B7280', fontSize: '14px', margin: '0' }}>Today's Rate</p>
              </div>
              <div style={{
                background: '#f8fafc',
                padding: '20px',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <h4 style={{ color: '#16a34a', fontSize: '28px', fontWeight: '700', margin: '0 0 8px 0' }}>
                  {Math.round(visitorStats.thisWeek / 7)}/day
                </h4>
                <p style={{ color: '#6B7280', fontSize: '14px', margin: '0' }}>Weekly Average</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div style={{
            background: '#fff',
            padding: '24px',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{
              color: '#16a34a',
              fontSize: '24px',
              fontWeight: '700',
              margin: '0 0 24px 0'
            }}>
              Analytics Dashboard
            </h3>
            <p style={{ color: '#6B7280', fontSize: '16px' }}>
              Advanced analytics features coming soon...
            </p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div style={{
            background: '#fff',
            padding: '24px',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{
              color: '#16a34a',
              fontSize: '24px',
              fontWeight: '700',
              margin: '0 0 24px 0'
            }}>
              Admin Settings
            </h3>
            <p style={{ color: '#6B7280', fontSize: '16px' }}>
              Settings panel coming soon...
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard; 