| Field | Type | Description |
|--|--|--|
| name |  u8[32] | |
| metadata |  u8[128] | |
| authorWallet |  publicKey | |
| queuePubkey |  publicKey | |
| oracleRequestBatchSize |  u32 | |
| minOracleResults |  u32 | |
| minJobResults |  u32 | |
| minUpdateDelaySeconds |  u32 | |
| startAfter |  i64 | |
| varianceThreshold |  [SwitchboardDecimal](/program/types/switchboarddecimal) | |
| forceReportPeriod |  i64 | |
| expiration |  i64 | |
| consecutiveFailureCount |  u64 | |
| nextAllowedUpdateTime |  i64 | |
| isLocked |  bool | |
| crankPubkey |  publicKey | |
| latestConfirmedRound |  [AggregatorRound](/program/types/aggregatorround) | |
| currentRound |  [AggregatorRound](/program/types/aggregatorround) | |
| jobPubkeysData |  publicKey[16] | |
| jobHashes |  [Hash](/program/types/hash)[16] | |
| jobPubkeysSize |  u32 | |
| jobsChecksum |  u8[32] | |
| authority |  publicKey | |
| historyBuffer |  publicKey | |
| ebuf |  u8[192] | |
