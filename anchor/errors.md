---
sidebar_position: 50
title: Errors
label: Errors
---

## Anchor Errors

See [@project-serum/anchor/src/error.ts#L53](https://github.com/project-serum/anchor/blob/HEAD/ts/src/error.ts#L53) for a list of built-in Anchor errors.

## Switchboard Errorssss

| Code | Hex | Name | Message |
| ---- | ------ | -------------------------------- | --------------------------------------------------------------------------- || 6000 | 0x0x1770 | ArrayOperationError | Illegal operation on a Switchboard array. |
| 6001 | 0x0x1771 | QueueOperationError | Illegal operation on a Switchboard queue. |
| 6002 | 0x0x1772 | IncorrectProgramOwnerError | An account required to be owned by the program has a different owner. |
| 6003 | 0x0x1773 | InvalidAggregatorRound | Aggregator is not currently populated with a valid round. |
| 6004 | 0x0x1774 | TooManyAggregatorJobs | Aggregator cannot fit any more jobs. |
| 6005 | 0x0x1775 | AggregatorCurrentRoundClosed | Aggregator's current round is closed. No results are being accepted. |
| 6006 | 0x0x1776 | AggregatorInvalidSaveResult | Aggregator received an invalid save result instruction. |
| 6007 | 0x0x1777 | InvalidStrDecimalConversion | Failed to convert string to decimal format. |
| 6008 | 0x0x1778 | AccountLoaderMissingSignature | AccountLoader account is missing a required signature. |
| 6009 | 0x0x1779 | MissingRequiredSignature | Account is missing a required signature. |
| 6010 | 0x0x177a | ArrayOverflowError | The attempted action will overflow a zero-copy account array. |
| 6011 | 0x0x177b | ArrayUnderflowError | The attempted action will underflow a zero-copy account array. |
| 6012 | 0x0x177c | PubkeyNotFoundError | The queried public key was not found. |
| 6013 | 0x0x177d | AggregatorIllegalRoundOpenCall | Aggregator round open called too early. |
| 6014 | 0x0x177e | AggregatorIllegalRoundCloseCall | Aggregator round close called too early. |
| 6015 | 0x0x177f | AggregatorClosedError | Aggregator is closed. Illegal aciton. |
| 6016 | 0x0x1780 | IllegalOracleIdxError | Illegal oracle index. |
| 6017 | 0x0x1781 | OracleAlreadyRespondedError | The provided oracle has already responded this round. |
| 6018 | 0x0x1782 | ProtoDeserializeError | Failed to deserialize protocol buffer. |
| 6019 | 0x0x1783 | UnauthorizedStateUpdateError | Unathorized program state modification attempted. |
| 6020 | 0x0x1784 | MissingOracleAccountsError | Not enough oracle accounts provided to closeRounds. |
| 6021 | 0x0x1785 | OracleMismatchError | An unexpected oracle account was provided for the transaction. |
| 6022 | 0x0x1786 | CrankMaxCapacityError | Attempted to push to a Crank that's at capacity |
| 6023 | 0x0x1787 | AggregatorLeaseInsufficientFunds | Aggregator update call attempted but attached lease has insufficient funds. |
| 6024 | 0x0x1788 | IncorrectTokenAccountMint | The provided token account does not point to the Switchbaord token mint. |
| 6025 | 0x0x1789 | InvalidEscrowAccount | An invalid escrow account was provided. |
| 6026 | 0x0x178a | CrankEmptyError | Crank empty. Pop failed. |
| 6027 | 0x0x178b | PdaDeriveError | Failed to derive a PDA from the provided seed. |
| 6028 | 0x0x178c | AggregatorAccountNotFound | Aggregator account missing from provided account list. |
| 6029 | 0x0x178d | PermissionAccountNotFound | Permission account missing from provided account list. |
| 6030 | 0x0x178e | LeaseAccountDeriveFailure | Failed to derive a lease account. |
| 6031 | 0x0x178f | PermissionAccountDeriveFailure | Failed to derive a permission account. |
| 6032 | 0x0x1790 | EscrowAccountNotFound | Escrow account missing from provided account list. |
| 6033 | 0x0x1791 | LeaseAccountNotFound | Lease account missing from provided account list. |
| 6034 | 0x0x1792 | DecimalConversionError | Decimal conversion method failed. |
| 6035 | 0x0x1793 | PermissionDenied | Permission account is missing required flags for the given action. |
| 6036 | 0x0x1794 | QueueAtCapacity | Oracle queue is at lease capacity. |
| 6037 | 0x0x1795 | ExcessiveCrankRowsError | Data feed is already pushed on a crank. |
| 6038 | 0x0x1796 | AggregatorLockedError | Aggregator is locked, no setting modifications or job additions allowed. |
| 6039 | 0x0x1797 | AggregatorInvalidBatchSizeError | Aggregator invalid batch size. |
| 6040 | 0x0x1798 | AggregatorJobChecksumMismatch | Oracle provided an incorrect aggregator job checksum. |
| 6041 | 0x0x1799 | IntegerOverflowError | An integer overflow occurred. |
| 6042 | 0x0x179a | InvalidUpdatePeriodError | Mimimum update period is 5 seconds. |
| 6043 | 0x0x179b | NoResultsError | Aggregator round evaluation attempted with no results. |
| 6044 | 0x0x179c | InvalidExpirationError | An expiration constraint was broken. |
| 6045 | 0x0x179d | InsufficientStakeError | An account provided insufficient stake for aciton. |
| 6046 | 0x0x179e | LeaseInactiveError | The provided lease account is not active. |
| 6047 | 0x0x179f | NoAggregatorJobsFound | No jobs are currently included in the aggregator. |
| 6048 | 0x0x17a0 | IntegerUnderflowError | An integer underflow occurred. |
| 6049 | 0x0x17a1 | OracleQueueMismatch | An invalid oracle queue account was provided. |
| 6050 | 0x0x17a2 | OracleWalletMismatchError | An unexpected oracle wallet account was provided for the transaction. |
| 6051 | 0x0x17a3 | InvalidBufferAccountError | An invalid buffer account was provided. |
| 6052 | 0x0x17a4 | InsufficientOracleQueueError | Insufficient oracle queue size. |
| 6053 | 0x0x17a5 | InvalidAuthorityError | Invalid authority account provided. |
| 6054 | 0x0x17a6 | InvalidTokenAccountMintError | A provided token wallet is associated with an incorrect mint. |
| 6055 | 0x0x17a7 | ExcessiveLeaseWithdrawlError | You must leave enough funds to perform at least 1 update in the lease. |
| 6056 | 0x0x17a8 | InvalideHistoryAccountError | Invalid history account provided. |
| 6057 | 0x0x17a9 | InvalidLeaseAccountEscrowError | Invalid lease account escrow. |
| 6058 | 0x0x17aa | InvalidCrankAccountError | Invalid crank provided. |
| 6059 | 0x0x17ab | CrankNoElementsReadyError | No elements ready to be popped. |
| 6060 | 0x0x17ac | VrfVerifyError | Error in verifying vrf proof. |
