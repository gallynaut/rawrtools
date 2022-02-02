## Accounts
|Name|isMut|isSigner|
|--|--|--|
| aggregator | true | false |
| oracle | true | false |
| oracleAuthority | false | true |
| oracleQueue | false | false |
| queueAuthority | false | false |
| feedPermission | true | false |
| oraclePermission | false | false |
| lease | true | false |
| escrow | true | false |
| tokenProgram | false | false |
| programState | false | false |
| historyBuffer | true | false |
## Args
| Field | Type | Description |
|--|--|--|
| oracleIdx |  u32 | |
| error |  bool | |
| value |  [BorshDecimal](/program/types/borshdecimal) | |
| jobsChecksum |  u8[32] | |
| minResponse |  [BorshDecimal](/program/types/borshdecimal) | |
| maxResponse |  [BorshDecimal](/program/types/borshdecimal) | |
| feedPermissionBump |  u8 | |
| oraclePermissionBump |  u8 | |
| leaseBump |  u8 | |
| stateBump |  u8 | |
