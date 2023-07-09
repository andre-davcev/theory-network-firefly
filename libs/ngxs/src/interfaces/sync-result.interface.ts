export interface SyncResult {
  sync: boolean;
  changedOrderBy: boolean;
  indexOld?: number;
  indexNew?: number;
}
