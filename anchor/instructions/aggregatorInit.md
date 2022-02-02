## Accounts
|Name|isMut|isSigner|
|--|--|--|
| aggregator | true | false |
| authority | false | false |
| queue | false | false |
| authorWallet | false | false |
| programState | false | false |
## Args
| Field | Type | Description |
|--|--|--|
| name |  u8[32] | |
| metadata |  u8[128] | |
| batchSize |  u32 | |
| minOracleResults |  u32 | |
| minJobResults |  u32 | |
| minUpdateDelaySeconds |  u32 | |
| startAfter |  i64 | |
| varianceThreshold |  [BorshDecimal](/program/types/borshdecimal) | |
| forceReportPeriod |  i64 | |
| expiration |  i64 | |
| stateBump |  u8 | |
