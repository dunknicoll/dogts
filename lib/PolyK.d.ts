interface PolyK
{
    IsSimple(p:any):any;

    IsConvex(p:any):any;

    GetArea(p:any):any;

    GetAABB(p:any):any;

    Triangulate(p:any):any;

    ContainsPoint(p:any,px:any,py:any):any;

    Slice(p:any, ax:any, ay:any, bx:any, by:any):any;

    Raycast(p:any, x:any, y:any, dx:any, dy:any, isc:any):any;

    ClosestEdge(p:any,x:any,y:any):any;

    _pointLineDist(p:any,a:any,b:any,edge:any,isc:any):any;

    _updateISC(dx:any,dy:any,a1:any,b1:any,b2:any,c:any,edge:any,isc:any):any;

    _getPoints(ps:any, ind0:any, ind1:any):any;

    _firstWithFlag(ps:any, ind:any):any;

    _PointInTriangle(px:any, py:any, ax:any, ay:any, bx:any, by:any, cx:any, cy:any):any;

    _RayLineIntersection(a1:any, a2:any, b1:any, b2:any, c:any):any;

    _GetLineIntersection(a1:any, a2:any, b1:any, b2:any, c:any):any;

    _InRect(a:any, b:any, c:any):any;

    _convex(ax:any, ay:any, bx:any, by:any, cx:any, cy:any):any;
    
    _P(x:any,y:any):any;
}