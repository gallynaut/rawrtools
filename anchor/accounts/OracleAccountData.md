| Field           | Type                                          | Description |
| --------------- | --------------------------------------------- | ----------- |
| name            | u8[32]                                        |             |
| metadata        | u8[128]                                       |             |
| oracleAuthority | publicKey                                     |             |
| lastHeartbeat   | i64                                           |             |
| numInUse        | u32                                           |             |
| tokenAccount    | publicKey                                     |             |
| queuePubkey     | publicKey                                     |             |
| metrics         | [OracleMetrics](/program/types/oraclemetrics) |             |
| ebuf            | u8[256]                                       |             |
