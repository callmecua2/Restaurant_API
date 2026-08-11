                    ORGANIZATION
                         │
              ┌──────────┴──────────┐
              │                     │
       Organization Auth        User Auth
              │                     │
       Owner / Manager       Owner / Manager / Staff
                                    │
              ┌─────────────────────┼──────────────────┐
              │                     │                  │
           FOOD/MENU              ORDER              USER
              │                     │                  │
       Category + Food          Create Order      Manage User
                                    │
                                    ▼
                           WAITING_PAYMENT
                                    │
                       ┌────────────┴────────────┐
                       │                         │
                     CASH                      QRIS
                       │                         │
                       └────────────┬────────────┘
                                    ▼
                                  PAID
                                    │
                                    ▼
                                PREPARED
                                    │
                                    ▼
                                  READY
                                    │
                                    ▼
                               COMPLETED