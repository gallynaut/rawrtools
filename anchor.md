# switchboard_v2 (0.1.0)

## Accounts

### SbState

| Field      | Type      |
| ---------- | --------- |
| authority  | publicKey |
| tokenMint  | publicKey |
| tokenVault | publicKey |
| ebuf       | u8[1024]  |

### AggregatorAccountData

| Field                   | Type               |
| ----------------------- | ------------------ |
| name                    | u8[32]             |
| metadata                | u8[128]            |
| authorWallet            | publicKey          |
| queuePubkey             | publicKey          |
| oracleRequestBatchSize  | u32                |
| minOracleResults        | u32                |
| minJobResults           | u32                |
| minUpdateDelaySeconds   | u32                |
| startAfter              | i64                |
| varianceThreshold       | SwitchboardDecimal |
| forceReportPeriod       | i64                |
| expiration              | i64                |
| consecutiveFailureCount | u64                |
| nextAllowedUpdateTime   | i64                |
| isLocked                | bool               |
| crankPubkey             | publicKey          |
| latestConfirmedRound    | AggregatorRound    |
| currentRound            | AggregatorRound    |
| jobPubkeysData          | publicKey[16]      |
| jobHashes               | Hash[16]           |
| jobPubkeysSize          | u32                |
| jobsChecksum            | u8[32]             |
| authority               | publicKey          |
| historyBuffer           | publicKey          |
| ebuf                    | u8[192]            |

### PermissionAccountData

| Field       | Type      |
| ----------- | --------- |
| authority   | publicKey |
| permissions | u32       |
| granter     | publicKey |
| grantee     | publicKey |
| expiration  | i64       |
| ebuf        | u8[256]   |

### LeaseAccountData

| Field             | Type      |
| ----------------- | --------- |
| escrow            | publicKey |
| queue             | publicKey |
| aggregator        | publicKey |
| tokenProgram      | publicKey |
| isActive          | bool      |
| crankRowCount     | u32       |
| createdAt         | i64       |
| updateCount       | u128      |
| withdrawAuthority | publicKey |
| ebuf              | u8[256]   |

### OracleQueueAccountData

| Field                         | Type               |
| ----------------------------- | ------------------ |
| name                          | u8[32]             |
| metadata                      | u8[64]             |
| authority                     | publicKey          |
| oracleTimeout                 | u32                |
| reward                        | u64                |
| minStake                      | u64                |
| slashingEnabled               | bool               |
| varianceToleranceMultiplier   | SwitchboardDecimal |
| feedProbationPeriod           | u32                |
| currIdx                       | u32                |
| size                          | u32                |
| gcIdx                         | u32                |
| consecutiveFeedFailureLimit   | u64                |
| consecutiveOracleFailureLimit | u64                |
| unpermissionedFeedsEnabled    | bool               |
| ebuf                          | u8[1023]           |
| maxSize                       | u32                |
| dataBuffer                    | publicKey          |

### CrankAccountData

| Field          | Type      |
| -------------- | --------- |
| name           | u8[32]    |
| metadata       | u8[64]    |
| queuePubkey    | publicKey |
| pqSize         | u32       |
| maxRows        | u32       |
| jitterModifier | u8        |
| ebuf           | u8[255]   |
| dataBuffer     | publicKey |

### VrfAccountData

| Field                | Type     |
| -------------------- | -------- |
| counter              | u128     |
| latestFinalizedRound | VrfRound |
| currentRound         | VrfRound |
| ebuf                 | u8[255]  |

### OracleAccountData

| Field           | Type          |
| --------------- | ------------- |
| name            | u8[32]        |
| metadata        | u8[128]       |
| oracleAuthority | publicKey     |
| lastHeartbeat   | i64           |
| numInUse        | u32           |
| tokenAccount    | publicKey     |
| queuePubkey     | publicKey     |
| metrics         | OracleMetrics |
| ebuf            | u8[256]       |

### JobAccountData

| Field          | Type      |
| -------------- | --------- |
| name           | u8[32]    |
| metadata       | u8[64]    |
| authorWallet   | publicKey |
| expiration     | i64       |
| hash           | u8[32]    |
| data           | bytes     |
| referenceCount | u32       |

## Instructions

### vaultTransfer

#### Accounts

| Name         | isMut | isSigner |
| ------------ | ----- | -------- |
| state        | false | false    |
| authority    | false | true     |
| to           | true  | false    |
| vault        | true  | false    |
| tokenProgram | false | false    |

#### Args

| Name   | Type                |
| ------ | ------------------- |
| params | VaultTransferParams |

### programInit

#### Accounts

| Name          | isMut | isSigner |
| ------------- | ----- | -------- |
| state         | true  | false    |
| authority     | false | false    |
| tokenMint     | true  | false    |
| vault         | true  | false    |
| payer         | true  | false    |
| systemProgram | false | false    |
| tokenProgram  | false | false    |

#### Args

| Name   | Type              |
| ------ | ----------------- |
| params | ProgramInitParams |

### programConfig

#### Accounts

| Name         | isMut | isSigner |
| ------------ | ----- | -------- |
| authority    | false | true     |
| programState | false | false    |

#### Args

| Name   | Type                |
| ------ | ------------------- |
| params | ProgramConfigParams |

### aggregatorInit

#### Accounts

| Name         | isMut | isSigner |
| ------------ | ----- | -------- |
| aggregator   | true  | false    |
| authority    | false | false    |
| queue        | false | false    |
| authorWallet | false | false    |
| programState | false | false    |

#### Args

| Name   | Type                 |
| ------ | -------------------- |
| params | AggregatorInitParams |

### aggregatorLock

#### Accounts

| Name       | isMut | isSigner |
| ---------- | ----- | -------- |
| aggregator | true  | false    |
| authority  | true  | true     |

#### Args

| Name   | Type                 |
| ------ | -------------------- |
| params | AggregatorLockParams |

### aggregatorSetAuthority

#### Accounts

| Name         | isMut | isSigner |
| ------------ | ----- | -------- |
| aggregator   | true  | false    |
| authority    | false | true     |
| newAuthority | false | false    |

#### Args

| Name   | Type                         |
| ------ | ---------------------------- |
| params | AggregatorSetAuthorityParams |

### aggregatorSetBatchSize

#### Accounts

| Name       | isMut | isSigner |
| ---------- | ----- | -------- |
| aggregator | true  | false    |
| authority  | false | true     |

#### Args

| Name   | Type                         |
| ------ | ---------------------------- |
| params | AggregatorSetBatchSizeParams |

### aggregatorSetMinJobs

#### Accounts

| Name       | isMut | isSigner |
| ---------- | ----- | -------- |
| aggregator | true  | false    |
| authority  | false | true     |

#### Args

| Name   | Type                       |
| ------ | -------------------------- |
| params | AggregatorSetMinJobsParams |

### aggregatorSetMinOracles

#### Accounts

| Name       | isMut | isSigner |
| ---------- | ----- | -------- |
| aggregator | true  | false    |
| authority  | false | true     |

#### Args

| Name   | Type                          |
| ------ | ----------------------------- |
| params | AggregatorSetMinOraclesParams |

### aggregatorSetVarianceThreshold

#### Accounts

| Name       | isMut | isSigner |
| ---------- | ----- | -------- |
| aggregator | true  | false    |
| authority  | false | true     |

#### Args

| Name   | Type                                 |
| ------ | ------------------------------------ |
| params | AggregatorSetVarianceThresholdParams |

### aggregatorSetHistoryBuffer

#### Accounts

| Name       | isMut | isSigner |
| ---------- | ----- | -------- |
| aggregator | true  | false    |
| authority  | false | true     |
| buffer     | true  | false    |

#### Args

| Name   | Type                             |
| ------ | -------------------------------- |
| params | AggregatorSetHistoryBufferParams |

### aggregatorSetQueue

#### Accounts

| Name       | isMut | isSigner |
| ---------- | ----- | -------- |
| aggregator | true  | false    |
| authority  | false | true     |
| queue      | false | false    |

#### Args

| Name   | Type                     |
| ------ | ------------------------ |
| params | AggregatorSetQueueParams |

### aggregatorAddJob

#### Accounts

| Name       | isMut | isSigner |
| ---------- | ----- | -------- |
| aggregator | true  | false    |
| authority  | false | true     |
| job        | true  | false    |

#### Args

| Name   | Type                   |
| ------ | ---------------------- |
| params | AggregatorAddJobParams |

### aggregatorRemoveJob

#### Accounts

| Name       | isMut | isSigner |
| ---------- | ----- | -------- |
| aggregator | true  | false    |
| authority  | false | true     |
| job        | true  | false    |

#### Args

| Name   | Type                      |
| ------ | ------------------------- |
| params | AggregatorRemoveJobParams |

### aggregatorOpenRound

#### Accounts

| Name           | isMut | isSigner |
| -------------- | ----- | -------- |
| aggregator     | true  | false    |
| lease          | true  | false    |
| oracleQueue    | true  | false    |
| queueAuthority | false | false    |
| permission     | true  | false    |
| escrow         | true  | false    |
| programState   | false | false    |
| payoutWallet   | true  | false    |
| tokenProgram   | false | false    |
| dataBuffer     | false | false    |

#### Args

| Name   | Type                      |
| ------ | ------------------------- |
| params | AggregatorOpenRoundParams |

### aggregatorSaveResult

#### Accounts

| Name             | isMut | isSigner |
| ---------------- | ----- | -------- |
| aggregator       | true  | false    |
| oracle           | true  | false    |
| oracleAuthority  | false | true     |
| oracleQueue      | false | false    |
| queueAuthority   | false | false    |
| feedPermission   | true  | false    |
| oraclePermission | false | false    |
| lease            | true  | false    |
| escrow           | true  | false    |
| tokenProgram     | false | false    |
| programState     | false | false    |
| historyBuffer    | true  | false    |

#### Args

| Name   | Type                       |
| ------ | -------------------------- |
| params | AggregatorSaveResultParams |

### jobInit

#### Accounts

| Name         | isMut | isSigner |
| ------------ | ----- | -------- |
| job          | true  | false    |
| authorWallet | false | false    |
| programState | false | false    |

#### Args

| Name   | Type          |
| ------ | ------------- |
| params | JobInitParams |

### permissionInit

#### Accounts

| Name          | isMut | isSigner |
| ------------- | ----- | -------- |
| permission    | true  | false    |
| authority     | false | false    |
| granter       | false | false    |
| grantee       | false | false    |
| payer         | true  | true     |
| systemProgram | false | false    |

#### Args

| Name   | Type                 |
| ------ | -------------------- |
| params | PermissionInitParams |

### permissionSet

#### Accounts

| Name       | isMut | isSigner |
| ---------- | ----- | -------- |
| permission | true  | false    |
| authority  | false | true     |

#### Args

| Name   | Type                |
| ------ | ------------------- |
| params | PermissionSetParams |

### oracleQueueInit

#### Accounts

| Name          | isMut | isSigner |
| ------------- | ----- | -------- |
| oracleQueue   | true  | true     |
| authority     | false | false    |
| buffer        | true  | false    |
| payer         | true  | false    |
| systemProgram | false | false    |

#### Args

| Name   | Type                  |
| ------ | --------------------- |
| params | OracleQueueInitParams |

### oracleQueueSetRewards

#### Accounts

| Name      | isMut | isSigner |
| --------- | ----- | -------- |
| queue     | true  | false    |
| authority | false | true     |

#### Args

| Name   | Type                        |
| ------ | --------------------------- |
| params | OracleQueueSetRewardsParams |

### oracleInit

#### Accounts

| Name            | isMut | isSigner |
| --------------- | ----- | -------- |
| oracle          | true  | false    |
| oracleAuthority | false | false    |
| wallet          | false | false    |
| programState    | false | false    |
| queue           | false | false    |
| payer           | false | false    |
| systemProgram   | false | false    |

#### Args

| Name   | Type             |
| ------ | ---------------- |
| params | OracleInitParams |

### oracleHeartbeat

#### Accounts

| Name            | isMut | isSigner |
| --------------- | ----- | -------- |
| oracle          | true  | false    |
| oracleAuthority | false | true     |
| tokenAccount    | false | false    |
| gcOracle        | true  | false    |
| oracleQueue     | true  | false    |
| permission      | false | false    |
| dataBuffer      | true  | false    |

#### Args

| Name   | Type                  |
| ------ | --------------------- |
| params | OracleHeartbeatParams |

### oracleWithdraw

#### Accounts

| Name            | isMut | isSigner |
| --------------- | ----- | -------- |
| oracle          | true  | false    |
| oracleAuthority | false | true     |
| tokenAccount    | true  | false    |
| withdrawAccount | true  | false    |
| oracleQueue     | true  | false    |
| permission      | true  | false    |
| tokenProgram    | false | false    |
| programState    | false | false    |
| payer           | true  | true     |
| systemProgram   | false | false    |

#### Args

| Name   | Type                 |
| ------ | -------------------- |
| params | OracleWithdrawParams |

### leaseInit

#### Accounts

| Name          | isMut | isSigner |
| ------------- | ----- | -------- |
| lease         | true  | false    |
| queue         | true  | false    |
| aggregator    | false | false    |
| funder        | true  | false    |
| payer         | true  | true     |
| systemProgram | false | false    |
| tokenProgram  | false | false    |
| owner         | true  | true     |
| escrow        | true  | false    |
| programState  | false | false    |

#### Args

| Name   | Type            |
| ------ | --------------- |
| params | LeaseInitParams |

### leaseExtend

#### Accounts

| Name         | isMut | isSigner |
| ------------ | ----- | -------- |
| lease        | true  | false    |
| aggregator   | false | false    |
| queue        | false | false    |
| funder       | true  | false    |
| owner        | true  | true     |
| escrow       | true  | false    |
| tokenProgram | false | false    |
| programState | false | false    |

#### Args

| Name   | Type              |
| ------ | ----------------- |
| params | LeaseExtendParams |

### leaseWithdraw

#### Accounts

| Name              | isMut | isSigner |
| ----------------- | ----- | -------- |
| lease             | true  | false    |
| escrow            | true  | false    |
| aggregator        | false | false    |
| queue             | false | false    |
| withdrawAuthority | false | true     |
| withdrawAccount   | true  | false    |
| tokenProgram      | false | false    |
| programState      | false | false    |

#### Args

| Name   | Type                |
| ------ | ------------------- |
| params | LeaseWithdrawParams |

### crankInit

#### Accounts

| Name          | isMut | isSigner |
| ------------- | ----- | -------- |
| crank         | true  | true     |
| queue         | false | false    |
| buffer        | true  | false    |
| payer         | true  | false    |
| systemProgram | false | false    |

#### Args

| Name   | Type            |
| ------ | --------------- |
| params | CrankInitParams |

### crankPush

#### Accounts

| Name           | isMut | isSigner |
| -------------- | ----- | -------- |
| crank          | true  | false    |
| aggregator     | true  | false    |
| oracleQueue    | true  | false    |
| queueAuthority | false | false    |
| permission     | false | false    |
| lease          | true  | false    |
| escrow         | true  | false    |
| programState   | false | false    |
| dataBuffer     | true  | false    |

#### Args

| Name   | Type            |
| ------ | --------------- |
| params | CrankPushParams |

### crankPop

#### Accounts

| Name            | isMut | isSigner |
| --------------- | ----- | -------- |
| crank           | true  | false    |
| oracleQueue     | true  | false    |
| queueAuthority  | false | false    |
| programState    | false | false    |
| payoutWallet    | true  | false    |
| tokenProgram    | false | false    |
| crankDataBuffer | true  | false    |
| queueDataBuffer | false | false    |

#### Args

| Name   | Type           |
| ------ | -------------- |
| params | CrankPopParams |

### ecvrfVerify

#### Accounts

| Name               | isMut | isSigner |
| ------------------ | ----- | -------- |
| randomnessProducer | false | false    |

#### Args

| Name   | Type              |
| ------ | ----------------- |
| params | EcvrfVerifyParams |

## Types

### AggregatorAddJobParams

| Field | Type |
| ----- | ---- |

### AggregatorInitParams

| Field                 | Type         |
| --------------------- | ------------ |
| name                  | u8[32]       |
| metadata              | u8[128]      |
| batchSize             | u32          |
| minOracleResults      | u32          |
| minJobResults         | u32          |
| minUpdateDelaySeconds | u32          |
| startAfter            | i64          |
| varianceThreshold     | BorshDecimal |
| forceReportPeriod     | i64          |
| expiration            | i64          |
| stateBump             | u8           |

### AggregatorLockParams

| Field | Type |
| ----- | ---- |

### AggregatorOpenRoundParams

| Field          | Type |
| -------------- | ---- |
| stateBump      | u8   |
| leaseBump      | u8   |
| permissionBump | u8   |
| jitter         | u8   |

### AggregatorRemoveJobParams

| Field  | Type |
| ------ | ---- |
| jobIdx | u32  |

### AggregatorSaveResultParams

| Field                | Type         |
| -------------------- | ------------ |
| oracleIdx            | u32          |
| error                | bool         |
| value                | BorshDecimal |
| jobsChecksum         | u8[32]       |
| minResponse          | BorshDecimal |
| maxResponse          | BorshDecimal |
| feedPermissionBump   | u8           |
| oraclePermissionBump | u8           |
| leaseBump            | u8           |
| stateBump            | u8           |

### AggregatorSetAuthorityParams

| Field | Type |
| ----- | ---- |

### AggregatorSetBatchSizeParams

| Field     | Type |
| --------- | ---- |
| batchSize | u32  |

### AggregatorSetHistoryBufferParams

| Field | Type |
| ----- | ---- |

### AggregatorSetMinJobsParams

| Field         | Type |
| ------------- | ---- |
| minJobResults | u32  |

### AggregatorSetMinOraclesParams

| Field            | Type |
| ---------------- | ---- |
| minOracleResults | u32  |

### AggregatorSetQueueParams

| Field | Type |
| ----- | ---- |

### AggregatorSetVarianceThresholdParams

| Field             | Type         |
| ----------------- | ------------ |
| varianceThreshold | BorshDecimal |

### CrankInitParams

| Field     | Type  |
| --------- | ----- |
| name      | bytes |
| metadata  | bytes |
| crankSize | u32   |

### CrankPopParams

| Field                     | Type         |
| ------------------------- | ------------ |
| stateBump                 | u8           |
| leaseBumps                | bytes        |
| permissionBumps           | bytes        |
| nonce                     | Option<u32>  |
| failOpenOnAccountMismatch | Option<bool> |

### CrankPushParams

| Field          | Type |
| -------------- | ---- |
| stateBump      | u8   |
| permissionBump | u8   |

### EcvrfVerifyParams

| Field | Type  |
| ----- | ----- |
| proof | bytes |
| alpha | bytes |

### JobInitParams

| Field      | Type   |
| ---------- | ------ |
| name       | u8[32] |
| expiration | i64    |
| stateBump  | u8     |
| data       | bytes  |

### LeaseExtendParams

| Field      | Type |
| ---------- | ---- |
| loadAmount | u64  |
| leaseBump  | u8   |
| stateBump  | u8   |

### LeaseInitParams

| Field             | Type      |
| ----------------- | --------- |
| loadAmount        | u64       |
| withdrawAuthority | publicKey |
| leaseBump         | u8        |
| stateBump         | u8        |

### LeaseWithdrawParams

| Field     | Type |
| --------- | ---- |
| stateBump | u8   |
| leaseBump | u8   |
| amount    | u64  |

### OracleHeartbeatParams

| Field          | Type |
| -------------- | ---- |
| permissionBump | u8   |

### OracleInitParams

| Field      | Type  |
| ---------- | ----- |
| name       | bytes |
| metadata   | bytes |
| stateBump  | u8    |
| oracleBump | u8    |

### OracleQueueInitParams

| Field                         | Type         |
| ----------------------------- | ------------ |
| name                          | u8[32]       |
| metadata                      | u8[64]       |
| reward                        | u64          |
| minStake                      | u64          |
| feedProbationPeriod           | u32          |
| oracleTimeout                 | u32          |
| slashingEnabled               | bool         |
| varianceToleranceMultiplier   | BorshDecimal |
| consecutiveFeedFailureLimit   | u64          |
| consecutiveOracleFailureLimit | u64          |
| queueSize                     | u32          |
| unpermissionedFeeds           | bool         |

### OracleQueueSetRewardsParams

| Field   | Type |
| ------- | ---- |
| rewards | u64  |

### OracleWithdrawParams

| Field          | Type |
| -------------- | ---- |
| stateBump      | u8   |
| permissionBump | u8   |
| amount         | u64  |

### PermissionInitParams

| Field          | Type |
| -------------- | ---- |
| permissionBump | u8   |

### PermissionSetParams

| Field      | Type                  |
| ---------- | --------------------- |
| permission | SwitchboardPermission |
| enable     | bool                  |

### ProgramConfigParams

| Field | Type      |
| ----- | --------- |
| token | publicKey |
| bump  | u8        |

### ProgramInitParams

| Field     | Type |
| --------- | ---- |
| stateBump | u8   |

### Hash

| Field | Type   |
| ----- | ------ |
| data  | u8[32] |

### AggregatorRound

| Field              | Type                   |
| ------------------ | ---------------------- |
| numSuccess         | u32                    |
| numError           | u32                    |
| isClosed           | bool                   |
| roundOpenSlot      | u64                    |
| roundOpenTimestamp | i64                    |
| result             | SwitchboardDecimal     |
| stdDeviation       | SwitchboardDecimal     |
| minResponse        | SwitchboardDecimal     |
| maxResponse        | SwitchboardDecimal     |
| oraclePubkeysData  | publicKey[16]          |
| mediansData        | SwitchboardDecimal[16] |
| currentPayout      | i64[16]                |
| mediansFulfilled   | bool[16]               |
| errorsFulfilled    | bool[16]               |

### AggregatorHistoryRow

| Field     | Type               |
| --------- | ------------------ |
| timestamp | i64                |
| value     | SwitchboardDecimal |

### SwitchboardDecimal

| Field    | Type |
| -------- | ---- |
| mantissa | i128 |
| scale    | u32  |

### VrfRound

| Field       | Type      |
| ----------- | --------- |
| vrfProducer | publicKey |
| reprProof   | u8[224]   |
| proof       | u8[80]    |
| alpha       | u8[64]    |
| alphaLen    | u32       |
| stage       | u32       |
| ebuf        | u8[255]   |

### CrankRow

| Field         | Type      |
| ------------- | --------- |
| pubkey        | publicKey |
| nextTimestamp | i64       |

### OracleMetrics

| Field                   | Type |
| ----------------------- | ---- |
| consecutiveSuccess      | u64  |
| consecutiveError        | u64  |
| consecutiveDisagreement | u64  |
| consecutiveLateResponse | u64  |
| consecutiveFailure      | u64  |
| totalSuccess            | u128 |
| totalError              | u128 |
| totalDisagreement       | u128 |
| totalLateResponse       | u128 |

### BorshDecimal

| Field    | Type |
| -------- | ---- |
| mantissa | i128 |
| scale    | u32  |

### VaultTransferParams

| Field     | Type |
| --------- | ---- |
| stateBump | u8   |
| amount    | u64  |

### SwitchboardPermission

| Name                   | Value |
| ---------------------- | ----- |
| PermitOracleHeartbeat  | 1     |
| PermitOracleQueueUsage | 2     |

### OracleResponseType

| Name             | Value |
| ---------------- | ----- |
| TypeSuccess      | 1     |
| TypeError        | 2     |
| TypeDisagreement | 3     |
| TypeNoResponse   | 4     |

### Error

| Name                 | Value |
| -------------------- | ----- |
| InvalidPublicKey     | 1     |
| SerializationError   | 2     |
| DeserializationError | 3     |
| InvalidDataError     | 4     |

## Errors

| Code | Name                             | Message                                                                     |
| ---- | -------------------------------- | --------------------------------------------------------------------------- |
| 6000 | ArrayOperationError              | Illegal operation on a Switchboard array.                                   |
| 6001 | QueueOperationError              | Illegal operation on a Switchboard queue.                                   |
| 6002 | IncorrectProgramOwnerError       | An account required to be owned by the program has a different owner.       |
| 6003 | InvalidAggregatorRound           | Aggregator is not currently populated with a valid round.                   |
| 6004 | TooManyAggregatorJobs            | Aggregator cannot fit any more jobs.                                        |
| 6005 | AggregatorCurrentRoundClosed     | Aggregator's current round is closed. No results are being accepted.        |
| 6006 | AggregatorInvalidSaveResult      | Aggregator received an invalid save result instruction.                     |
| 6007 | InvalidStrDecimalConversion      | Failed to convert string to decimal format.                                 |
| 6008 | AccountLoaderMissingSignature    | AccountLoader account is missing a required signature.                      |
| 6009 | MissingRequiredSignature         | Account is missing a required signature.                                    |
| 6010 | ArrayOverflowError               | The attempted action will overflow a zero-copy account array.               |
| 6011 | ArrayUnderflowError              | The attempted action will underflow a zero-copy account array.              |
| 6012 | PubkeyNotFoundError              | The queried public key was not found.                                       |
| 6013 | AggregatorIllegalRoundOpenCall   | Aggregator round open called too early.                                     |
| 6014 | AggregatorIllegalRoundCloseCall  | Aggregator round close called too early.                                    |
| 6015 | AggregatorClosedError            | Aggregator is closed. Illegal aciton.                                       |
| 6016 | IllegalOracleIdxError            | Illegal oracle index.                                                       |
| 6017 | OracleAlreadyRespondedError      | The provided oracle has already responded this round.                       |
| 6018 | ProtoDeserializeError            | Failed to deserialize protocol buffer.                                      |
| 6019 | UnauthorizedStateUpdateError     | Unathorized program state modification attempted.                           |
| 6020 | MissingOracleAccountsError       | Not enough oracle accounts provided to closeRounds.                         |
| 6021 | OracleMismatchError              | An unexpected oracle account was provided for the transaction.              |
| 6022 | CrankMaxCapacityError            | Attempted to push to a Crank that's at capacity                             |
| 6023 | AggregatorLeaseInsufficientFunds | Aggregator update call attempted but attached lease has insufficient funds. |
| 6024 | IncorrectTokenAccountMint        | The provided token account does not point to the Switchbaord token mint.    |
| 6025 | InvalidEscrowAccount             | An invalid escrow account was provided.                                     |
| 6026 | CrankEmptyError                  | Crank empty. Pop failed.                                                    |
| 6027 | PdaDeriveError                   | Failed to derive a PDA from the provided seed.                              |
| 6028 | AggregatorAccountNotFound        | Aggregator account missing from provided account list.                      |
| 6029 | PermissionAccountNotFound        | Permission account missing from provided account list.                      |
| 6030 | LeaseAccountDeriveFailure        | Failed to derive a lease account.                                           |
| 6031 | PermissionAccountDeriveFailure   | Failed to derive a permission account.                                      |
| 6032 | EscrowAccountNotFound            | Escrow account missing from provided account list.                          |
| 6033 | LeaseAccountNotFound             | Lease account missing from provided account list.                           |
| 6034 | DecimalConversionError           | Decimal conversion method failed.                                           |
| 6035 | PermissionDenied                 | Permission account is missing required flags for the given action.          |
| 6036 | QueueAtCapacity                  | Oracle queue is at lease capacity.                                          |
| 6037 | ExcessiveCrankRowsError          | Data feed is already pushed on a crank.                                     |
| 6038 | AggregatorLockedError            | Aggregator is locked, no setting modifications or job additions allowed.    |
| 6039 | AggregatorInvalidBatchSizeError  | Aggregator invalid batch size.                                              |
| 6040 | AggregatorJobChecksumMismatch    | Oracle provided an incorrect aggregator job checksum.                       |
| 6041 | IntegerOverflowError             | An integer overflow occurred.                                               |
| 6042 | InvalidUpdatePeriodError         | Mimimum update period is 5 seconds.                                         |
| 6043 | NoResultsError                   | Aggregator round evaluation attempted with no results.                      |
| 6044 | InvalidExpirationError           | An expiration constraint was broken.                                        |
| 6045 | InsufficientStakeError           | An account provided insufficient stake for aciton.                          |
| 6046 | LeaseInactiveError               | The provided lease account is not active.                                   |
| 6047 | NoAggregatorJobsFound            | No jobs are currently included in the aggregator.                           |
| 6048 | IntegerUnderflowError            | An integer underflow occurred.                                              |
| 6049 | OracleQueueMismatch              | An invalid oracle queue account was provided.                               |
| 6050 | OracleWalletMismatchError        | An unexpected oracle wallet account was provided for the transaction.       |
| 6051 | InvalidBufferAccountError        | An invalid buffer account was provided.                                     |
| 6052 | InsufficientOracleQueueError     | Insufficient oracle queue size.                                             |
| 6053 | InvalidAuthorityError            | Invalid authority account provided.                                         |
| 6054 | InvalidTokenAccountMintError     | A provided token wallet is associated with an incorrect mint.               |
| 6055 | ExcessiveLeaseWithdrawlError     | You must leave enough funds to perform at least 1 update in the lease.      |
| 6056 | InvalideHistoryAccountError      | Invalid history account provided.                                           |
| 6057 | InvalidLeaseAccountEscrowError   | Invalid lease account escrow.                                               |
| 6058 | InvalidCrankAccountError         | Invalid crank provided.                                                     |
| 6059 | CrankNoElementsReadyError        | No elements ready to be popped.                                             |
| 6060 | VrfVerifyError                   | Error in verifying vrf proof.                                               |