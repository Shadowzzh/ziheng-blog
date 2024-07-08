/**
 * 树结构数据
 */
export class Tree<Data> {
  /** 节点附带的数据 */
  private _data: Data | undefined;
  /** 节点的子节点列表 */
  private _children: Tree<Data>[] = [];
  /** 父节点 */
  private _parent: Tree<Data> | undefined = undefined;
  /** 根节点 */
  private _root: Tree<Data> | undefined = undefined;
  /** 节点的深度 */
  private _depth: number = 0;
  /** 节点的唯一标识 */
  private _uniqueId: string;
  /** 深度映射表 */
  private _depthMap: Map<number, Set<Tree<Data>>> = new Map();

  constructor(options?: { data?: Data }) {
    this._data = options?.data;
    this._root = this;
    this._uniqueId = Math.random().toString() + this._depth;
  }

  get depthMap() {
    return this._depthMap;
  }

  get uniqueId() {
    return this._uniqueId;
  }

  get parent() {
    return this._parent;
  }

  get root() {
    return this._root;
  }

  get depth() {
    return this._depth;
  }

  get data() {
    return this._data;
  }

  get children() {
    return this._children;
  }

  /**
   * 添加子节点
   * @param child 要添加的子节点
   */
  appendChild(child: Tree<Data>) {
    child._parent = this;
    child._root = this._root;
    child._depth = this._depth + 1;

    // 优化：先检查深度映射表中是否已存在对应深度的集合，不存在再创建
    let depthSet = this._depthMap.get(child._depth);
    if (!depthSet) {
      depthSet = new Set();
      this._depthMap.set(child._depth, depthSet);
    }
    depthSet.add(child);

    this._children.push(child);

    // 优化：提取更新节点信息为单独的方法
    this.updateNodeInfo(child);
  }

  /**
   * 更新节点的深度和根节点信息
   * @param node 要更新的节点
   */
  private updateNodeInfo(node: Tree<Data>) {
    node._root = this._root;
    node._depth = node._parent!._depth + 1;

    let depthSet = this._depthMap.get(node._depth);
    if (!depthSet) {
      depthSet = new Set();
      this._depthMap.set(node._depth, depthSet);
    }
    depthSet.add(node);
  }

  /**
   * 遍历祖先节点
   * @param callback 回调函数
   * @returns 祖先节点列表
   */
  eachAncestor(callback: (child: Tree<Data>) => void) {
    let current: Tree<Data> | undefined = Object.create(this);
    const ancestors = [];

    while ((current = current?.parent)) {
      ancestors.push(current);
      callback(current);
    }

    return ancestors;
  }

  /**
   * 遍历子节点
   * @param callback 回调函数
   * @param options 遍历选项
   */
  eachChild(callback: (child: Tree<Data>) => void, options?: { method: 'deep' | 'breadth' }) {
    const method = options?.method ?? 'deep';

    const tasks: Tree<Data>[] = [];
    let current: Tree<Data> | undefined = undefined;

    tasks.push(...this._children);

    while ((current = tasks.shift())) {
      callback(current);

      if (method === 'deep') {
        tasks.unshift(...current._children);
      } else if (method === 'breadth') {
        tasks.push(...current._children);
      }
    }
  }

  /**
   * 判断是否是根节点
   * @returns 是否是根节点
   */
  isRoot(): boolean {
    return this === this._root;
  }

  /**
   * 获取叶子结点
   * @returns 叶子结点
   */
  getLeaf() {
    let leaf: undefined | Tree<Data> = undefined;

    this.root?.eachChild((child) => {
      if (child.children.length !== 0) return;
      if (!leaf) return (leaf = child);
      if (child.depth > leaf.depth) leaf = child;
    });

    return leaf;
  }

  /**
   * 获取最大深度
   * @returns 最大深度
   */
  getMaxDepth() {
    let maxDepth = 0;

    this.root?.eachChild((child) => {
      if (child.depth > maxDepth) maxDepth = child.depth;
    });

    return maxDepth;
  }
}
